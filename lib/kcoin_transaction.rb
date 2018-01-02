require 'rsa'
require 'parser'
require 'net/http'
require 'net/https'
require 'uri'
require 'json'
require 'crawlers/kcoin_crawler'

module KcoinTransaction
=begin TRANSACTION STRUCTURE
  trans = {
    inputs: [
      {
        referencedOutputHash: "7d60a271b420f5ee9b2bcab98340b20ad4d8d6e540f1472ac09e2c6de1e15675",
        referencedOutputIndex: 1,
      },
      {
        referencedOutputHash: "7d60a271b420f5ee9b2bcab98340b20ad4d8d6e540f1472ac09e2c6de1e15675",
        referencedOutputIndex: 0,
      },
    ],
    outputs: [
      {
        value: 100,
        lockScript: "ADD 8fe79af2e39fe8972f91f16dcef26ba705a9abf19f51a21e3209267b544538cb"
      },
      {
        value: 100,
        lockScript: "ADD 8fe79af2e39fe8972f91f16dcef26ba705a9abf19f51a21e3209267b544538cb"
      }
    ],
    version: 1 
  }
=end
  def self.create(transaction, private_key)
    trans = sign(transaction, private_key)
    uri = URI.parse('https://api.kcoin.club/transactions')
    https = Net::HTTP.new(uri.host, uri.port)
    https.use_ssl = true
    req = Net::HTTP::Post.new(uri.path, 'Content-Type' => 'application/json')
    req.body = trans.to_json
    res = https.request(req)
  end

  def self.syncing_transaction
    data = KcoinCrawler.get_data('/unconfirmed-transactions')
    transactions = KcoinCrawler.parse_json(data)
    @receivers = Wallet.all.map(&:address)    
    transactions.each do |transaction|
      record_output(transaction)
      record_input(transaction)
    end
  end

  def self.sign(transaction, private_key)
    trans_binary = to_binary transaction
    signature = RSA.sign trans_binary, private_key
    public_key = RSA.get_public_key private_key
    pub = Parser.s_to_hex public_key.to_pem
    transaction[:inputs].each do |input|
      input[:unlockScript] = "PUB #{pub} SIG #{signature}"
    end
    transaction
  end

  def self.to_binary(transaction)
    inputs = transaction[:inputs]
    outputs = transaction[:outputs]
    # Version (i)
    version = Parser.i_to_buff transaction[:version]

    # Input count (i)
    inputs_length = Parser.i_to_buff inputs.length

    # Inputs each
    inputs_buff = ""
    inputs.each do |input|
      # Output hash (hexs)
      output_hash = Parser.hex_to_s input[:referencedOutputHash]
      # Output index (i)
      output_index = Parser.i_to_buff input[:referencedOutputIndex]
      # UnlockScript length = 0 (i)
      unlock_script_length = Parser.i_to_buff 0
      # Add all to input buffer
      inputs_buff += (output_hash + output_index + unlock_script_length)
    end

    # Output count
    outputs_length =  Parser.i_to_buff outputs.length

    # Outputs each
    outputs_buff = ""
    outputs.each do |output|
      # value (i)
      value = Parser.i_to_buff output[:value]
      # lockScriptLength (i)
      lock_script_length = Parser.i_to_buff output[:lockScript].length
      # lockScript (s)
      lock_script = output[:lockScript]
      # add all to outputs buffer
      outputs_buff += (value + lock_script_length + lock_script)
    end

    version + inputs_length + inputs_buff + outputs_length + outputs_buff
  end

  def self.record_output(transaction)
    transaction['outputs'].each_with_index do |output, index|
      receiver = output['lockScript'].split(' ')[1]
      if @receivers.include? receiver
        unless Transaction.find_by(hash_str: transaction['hash'])
          Transaction.create(
            hash_str: transaction['hash'],
            is_confirm: false
          )
        end
        o = Output.find_by(output_ref: transaction['hash'], 
                                output_index: index,
                                receiver: receiver)
        unless o
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
  end
  
  def self.record_input(transaction)
    transaction['inputs'].each do |input|
      output_ref = input['referencedOutputHash']
      output_index = input['referencedOutputIndex']
      sender = find_sender(input)
      output = Output.find_by(output_ref: output_ref, 
                              output_index: output_index,
                              receiver: sender)
      if output
        unless Transaction.find_by(hash_str: transaction['referencedOutputHash'])
          Transaction.create(
            hash_str: transaction['referencedOutputHash'],
            is_confirm: false
          )
        end
        output.update(is_used: true)
      end
    end
  end

  def self.find_sender(input)
    script = input['unlockScript']
    sender = script.split(' ')[1]
    Parser.pub_to_address sender
  end
end