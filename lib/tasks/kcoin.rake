require 'crawlers/kcoin_crawler'
require 'parser'

namespace :kcoin do

  desc "Sync server data with kcoin server"
  task sync: [:environment] do
    @receivers = Wallet.all.map(&:address)
    loop do
      response = KcoinCrawler.get_data('/blocks', limit: 20, offset: Block.count)
      data = KcoinCrawler.parse_json(response)
      # Loop through all data to find record
      data.each do |d|
        @block = Block.create(hash_str: d['hash'])
        d['transactions'].each do |transaction|
          record_output(transaction)
          record_input(transaction)
        end
      end

      # Print process
      total = Block.count
      print " Syncing... #{(total / response['x-total-count'].to_f * 100).to_i}% \r"
      $stdout.flush      

      break if response['x-total-count'].to_i <= total    
    end
    print "Completed\n"
  end
end

def record_output(transaction)
  transaction['outputs'].each_with_index do |output, index|
    receiver = output['lockScript'].split(' ')[1]
    if @receivers.include? receiver
      Transaction.create(
        block_hash: @block.hash_str,
        hash_str: transaction['hash'],
        is_confirm: true
      )
      Output.create(
        output_ref: transaction['hash'],
        output_index: index,
        amount: output['value'],
        receiver: receiver,
        sender: find_sender(transaction['inputs'][0])
      )
    end
  end
end

def record_input(transaction)
  transaction['inputs'].each do |input|
    output_ref = input['referencedOutputHash']
    next if output_ref == "0000000000000000000000000000000000000000000000000000000000000000"
    output_index = input['referencedOutputIndex']
    sender = find_sender(input)
    output = Output.find_by(output_ref: output_ref, 
                            output_index: output_index,
                            receiver: sender)
    if output
      output.update(is_used: true)
    end
  end
end

def find_sender(input)
  script = input['unlockScript']
  sender = script.split(' ')[1]
  Parser.pub_to_address sender
end

