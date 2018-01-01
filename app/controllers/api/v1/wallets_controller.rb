class Api::V1::WalletsController < ApplicationController
  def show
    wallet = Wallet.find_by(user_id: current_user.id)
    real_amount = wallet.real_amount
    response = {wallet_address: wallet.address, real_amount: real_amount}
    render json: response
  end
end