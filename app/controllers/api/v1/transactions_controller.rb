class Api::V1::TransactionsController < ApplicationController
  def create
    @sender = current_user.wallet.address
    @receiver = params[:receiver]
    @amount = params[:amount]
    @outputs = Output.usable(@sender)
    @availble_amount = @outputs.sum(:amount)
    if @availble_amount >= @amount
      trans = create_transaction
      res = KcoinTransaction.create(trans, current_user.wallet.private_key)
      if res.code == "200"
        KcoinTransaction.syncing_transaction
        render json:{ message: "Transaction created" }, status: 201
      else
        res = JSON.parse(res.body)
        render json: { errors: res["message"] }, status: res.code.to_i
      end
    else
      render json: { errors: "Not enough money" }, status: 400
    end
  end

  def index
    per_page = params[:per_page] || PER_PAGE
    @transactions = KcoinService.new.get_lastest per_page: per_page
    render json: { data: @transactions, total: @transactions.length }, status: 200    
  end

  private
  def create_transaction    
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
