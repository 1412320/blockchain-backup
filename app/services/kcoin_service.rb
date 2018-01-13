require ('crawlers/kcoin_crawler')
require ('kcoin_transaction')
require 'array_iterator'

class KcoinService
  def initialize(user)
    @user = user
  end

  def get_transaction(id)
    data = KcoinCrawler.get_data("/transactions/#{id}")
    transaction = KcoinCrawler.parse_json(data)
    transaction['inputs'].map! do |input|
      {
        outputHash: input['referencedOutputHash'],
        outputIndex: input['referencedOutputIndex']
      }
    end
    transaction['outputs'].map! do |output|
      {
        to: output['lockScript'].split(' ')[1],
        value: output['value']
      }
    end
    transaction
  end

  def create_transaction(receiver, amount)
    @sender = @user.wallet.address
    @receiver = receiver
    @amount = amount
    @outputs = Output.usable(@sender)
    @availble_amount = @outputs.sum(:amount)
    if @availble_amount >= @amount
      trans = init_transaction
      res = KcoinTransaction.create(trans, @user.wallet.private_key)
    else
      return nil
    end
  end

  def get_lastest_transactions(per_page: 20)
    @per_page = per_page
    @transactions = []
    data = KcoinCrawler.get_data("/blocks", order: -1, limit: @per_page)
    blocks = KcoinCrawler.parse_json(data)
    i1 = ArrayIterator.new(blocks)
    while i1.has_next?
      i2 = ArrayIterator.new(i1.item['transactions'])
      while i2.has_next?
        process_transaction(i2.item)
        return @transactions if @transactions.length >= @per_page
        i2.next_item
      end
      i1.next_item
    end
    @transactions
  end

  private 
  def process_transaction(transaction)
    sender = KcoinTransaction.find_sender(transaction['inputs'][0])

    i = ArrayIterator.new(transaction['outputs'])
    while i.has_next?
      receiver = i.item['lockScript'].split(' ')[1]
      trans = {
        hash: transaction['hash'],
        sender: sender,
        receiver: receiver,
        value: i.item['value']
      }
      @transactions << trans
      break if @transactions.length >= @per_page
      i.next_item
    end
    
  end

  def init_transaction
    inputs = @outputs.map do |o|
      {
        referencedOutputHash: o.output_ref,
        referencedOutputIndex: o.output_index
      }
      end
  
      outputs = [
        {
          value: @amount,
          lockScript: "ADD #{@receiver}"
        }
      ]
      if @availble_amount > @amount
        outputs << {
          value: @availble_amount - @amount,
          lockScript: "ADD #{@sender}"
        }
      end
  
      return { 
        inputs: inputs,
        outputs: outputs,
        version: 1 
      }
  end
end