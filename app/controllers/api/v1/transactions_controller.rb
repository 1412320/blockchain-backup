class Api::V1::TransactionsController < ApplicationController
  before_action :init_service
  def create
    res = @service.create_transaction(params[:receiver], params[:amount])
    if res
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
    @transactions = @service.get_lastest_transactions per_page: per_page
    render json: { data: @transactions, total: @transactions.length }, status: 200    
  end

  private 
  def init_service
    @service = KcoinService.new current_user
  end
end