class Api::V1::PendingTransactionsController < ApplicationController
  def index
    sender = current_user.wallet.address
    pendings = current_user.pending_transactions.to_a
    pendings.map! do |pending|
      {
        id: pending.id,
        sender: sender,
        receiver: pending.receiver,
        value: pending.amount
      }
    end
    render json: { data: pendings, total: pendings.length }, status: 200
  end

  def confirm
    pending = PendingTransaction.find_by(id: params[:id], user: current_user)
    if pending && current_user.authenticate_otp(params[:otp_code])
      if current_user.valid_password? params[:password]
        @service = KcoinService.new current_user
        res = @service.create_transaction(pending.receiver, pending.amount)
        if res
          if res.code == "200"
            pending.destroy
            KcoinTransaction.syncing_transaction
            render json:{ message: "Transaction created" }, status: 201
          else
            body = JSON.parse(res.body)
            render json: { errors: body["message"] }, status: res.code.to_i
          end
        else
          render json: { errors: "Not enough money" }, status: 400
        end
      else
        render json: { errors: "Wrong password" }, status: 400
      end
    else
      render json: { errors: "Wrong OTP code" }, status: 400
    end
  end

  def destroy
    pending = PendingTransaction.find_by(id: params[:id], user: current_user)
    if pending
      pending.destroy
    end
    head 204
  end
  def system_pending_transactions
    page = params[:page_number].to_i
    @transactions = PendingTransaction.all.limit(10).offset(10*(page-1)).to_a
    @transactions.map! do |pending|
      sender = pending.user.wallet.address
      {
        id: pending.id,
        sender: sender,
        receiver: pending.receiver,
        value: pending.amount
      }
    end
    render json: {transactions: @transactions, total: @transactions.length}, status: 200
  end
end
