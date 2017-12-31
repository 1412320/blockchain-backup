require 'net/http'
require 'json'

namespace :kcoin do
  BASE_URL = 'https://api.kcoin.club'

  desc "Sync server data with kcoin server"
  task sync: [:environment] do
    @wallet = "3e0dcfdcef801fc6dd968b475cdbfcbe2cd31934f36c5981c25a83d51c0125d5"
    time = 0
    loop do
      response = get_data('/blocks', limit: 20, offset: 20 * time)
      data = parse_json(response)
      data.each do |d|
        d['transactions'].each do |transaction|
          record_output(transaction)
        end
      end
      time += 1
      p time
      break if response['x-total-count'].to_i <= 20 * time    
    end
    balance = Output.where(receiver: @wallet, is_used: false).sum(:amount)
    p "Wallet balance: #{balance}"
  end
end

def record_output(transaction)
  transaction['outputs'].each_with_index do |output, index|
    if output['lockScript'].split(' ')[1] == @wallet
      Output.create(
        output_ref: transaction['hash'],
        output_index: index,
        amount: output['value'],
        receiver: @wallet,
        sender: find_sender(transaction)
      )
    end
  end
end

def find_sender(transaction)
  hash = transaction['inputs'][0]['referencedOutputHash']
  output_index = transaction['inputs'][0]['referencedOutputIndex'].to_i
  data = parse_json(get_data("/transactions/#{hash}"))
  output = data['outputs'][output_index]
  output['lockScript'].split(' ')[1]
end

def parse_json(response)
  JSON.parse(response.body)
end

def get_data(endpoint, params = {})
  uri = URI(BASE_URL + endpoint)
  uri.query = URI.encode_www_form(params) if params
  response = Net::HTTP.get_response(uri)
end