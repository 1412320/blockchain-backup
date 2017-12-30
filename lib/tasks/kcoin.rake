require 'net/http'
require 'json'

namespace :kcoin do
  BASE_URL = 'https://api.kcoin.club'

  desc "Sync server data with kcoin server"
  task sync: :environment do
    wallet = "3e0dcfdcef801fc6dd968b475cdbfcbe2cd31934f36c5981c25a83d51c0125d5"
    amount = 0
    time = 0
    loop do
      response = get_data('/blocks', limit: 20, offset: 20 * time)
      data = JSON.parse(response.body)
      data.each do |d|
        d['transactions'].each do |t|
          t['outputs'].each do |o|
            p o['lockScript'] if o['lockScript'] != "ADD aa5f720c8080d81b9bd9781bf85c38c4d24cc010d0536e667f169ac8a5eb72d0"
            if o['lockScript'].split(' ')[1] == wallet
              amount += o['value'] 
              p d['hash']
            end
          end
        end
      end
      time += 1
      p time
      break if response['x-total-count'].to_i <= 20 * time    
    end
    p "Amount: #{amount}"
  end

end

def get_data(endpoint, params = {})
  uri = URI(BASE_URL + endpoint)
  uri.query = URI.encode_www_form(params) if params
  response = Net::HTTP.get_response(uri)
end