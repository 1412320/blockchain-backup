require 'crawlers/kcoin_crawler'
require 'parser'
require 'array_iterator'

namespace :kcoin do

  desc "Sync server data with kcoin server"
  task sync: [:environment] do
    @receivers = Wallet.all.map(&:address)
    loop do
      response = KcoinCrawler.get_data('/blocks', limit: 20, offset: Block.count)
      data = KcoinCrawler.parse_json(response)
      # Loop through all data to find record
      i = ArrayIterator.new(data)
      while i.has_next?
        @block = Block.create(hash_str: i.item['hash'])
        i1 = ArrayIterator.new(i.item['transactions'])
        while i1.has_next?
          record_output(i1.item)
          record_input(i1.item)
          i1.next_item
        end
        i.next_item
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
  i = ArrayIterator.new(transaction['outputs'])
  while i.has_next?
    receiver = i.item['lockScript'].split(' ')[1]
    if @receivers.include? receiver
      trans = Transaction.find_by(hash_str: transaction['hash'])
      if trans
        trans.update(is_confirm: true)
      else  
        Transaction.create(
          hash_str: transaction['hash'],
          is_confirm: true
        )
      end
      o = Output.find_by(output_ref: transaction['hash'], 
                              output_index: i.index,
                              receiver: receiver)
      unless o
        Output.create(
          output_ref: transaction['hash'],
          output_index: i.index,
          amount: i.item['value'],
          receiver: receiver,
          sender: find_sender(transaction['inputs'][0])
        )
      end
    end
    i.next_item
  end
end

def record_input(transaction)
  i = ArrayIterator.new(transaction['inputs'])
  while i.has_next?
    output_ref = i.item['referencedOutputHash']
    next if output_ref == "0000000000000000000000000000000000000000000000000000000000000000"
    output_index = i.item['referencedOutputIndex']
    sender = find_sender(i.item)
    output = Output.find_by(output_ref: output_ref, 
                            output_index: output_index,
                            receiver: sender)
    if output
      trans = Transaction.find_by(hash_str: i.item['referencedOutputHash'])
      if trans
        trans.update(is_confirm: true)
      else 
        Transaction.create(
          hash_str: i.item['referencedOutputHash'],
          is_confirm: true
        )
      end
      output.update(is_used: true)
    end
    i.next_item
  end
end

def find_sender(input)
  script = input['unlockScript']
  sender = script.split(' ')[1]
  Parser.pub_to_address sender
end

