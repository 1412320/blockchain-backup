require ('crawlers/kcoin_crawler')
class KcoinService
  def initialize
  end

  def get_lastest(per_page: 20)
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
end