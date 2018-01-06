require ('crawlers/kcoin_crawler')
class KcoinService
  def initialize(user)
    @user = user
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
    blocks.each do |block|
      block['transactions'].each do |transaction|
        process_transaction(transaction)
        return @transactions if @transactions.length >= @per_page
      end
    end
    @transactions
  end

  private 
  def process_transaction(transaction)
    sender = KcoinTransaction.find_sender(transaction['inputs'][0])
    transaction['outputs'].each do |output|
      receiver = output['lockScript'].split(' ')[1]
      trans = {
        hash: transaction['hash'],
        sender: sender,
        receiver: receiver,
        value: output['value']
      }
      @transactions << trans
      break if @transactions.length >= @per_page
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