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

    def destroy
    pending = PendingTransaction.find_by(id: params[:id], user: current_user)
    if pending
      pending.destroy
    end
    head 204    
  end
end
