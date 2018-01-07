class Api::V1::TransactionsController < ApplicationController
  before_action :init_service
  def create
    wallet = current_user.wallet
    available = wallet.available_amount
    if params[:amount] <= available
      pending = PendingTransaction.new(user: current_user,
                            receiver: params[:receiver],
                            amount: params[:amount])
      if pending.save
        render json:{ message: "Transaction created" }, status: 201
      else
        render json: { errors: pending.errors.full_message[0] }, status: 400
      end
    else
      render json: { errors: "Not enough money" }, status: 400
    end

  end

  def index
    per_page = params[:per_page].to_i || PER_PAGE
    @transactions = @service.get_lastest_transactions per_page: per_page
    render json: { data: @transactions, total: @transactions.length }, status: 200
  end

  def me
    @address = current_user.wallet.address
    @outputs = Output.where(sender: @address).or(
      Output.where(receiver: @address)
    )
    @transactions = @outputs.map do |output|
      {
        hash: output.output_ref,
        sender: output.sender,
        receiver: output.receiver,
        value: output.amount
      }
    end
    render json: { data: @transactions, total: @transactions.length }, status: 200
  end

  def show
    transaction = @service.get_transaction(params[:id])
    render json: { data: transaction }, status: 200
  end

  private
  def init_service
    @service = KcoinService.new current_user
  end
end
