namespace :kcoin do

  desc "Sync server data with kcoin server"
  task sync: [:environment] do
    @wallet = "3e0dcfdcef801fc6dd968b475cdbfcbe2cd31934f36c5981c25a83d51c0125d5"
    time = 0
    loop do
      response = get_data('/blocks', limit: 20, offset: Block.count)
      data = parse_json(response)
      data.each do |d|
        @block = Block.create(hash_str: d['hash'])
        d['transactions'].each do |transaction|
          record_output(transaction)
        end
      end
      time += 1
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
    if output['lockScript'].split(' ')[1] == @wallet
      Transaction.create(
        block_hash: @block.hash_str,
        hash_str: transaction['hash'],
        is_confirm: true
      )
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

