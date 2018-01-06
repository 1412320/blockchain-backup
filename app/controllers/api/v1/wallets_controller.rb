class Api::V1::WalletsController < ApplicationController
  def show
    wallet = Wallet.find_by(user_id: current_user.id)
    real_amount = wallet.real_amount
    available_amount = wallet.available_amount
    response = {
      wallet_address: wallet.address,
      real_amount: real_amount,
      available_amount: available_amount,
      role: current_user.role
    }
    render json: response
  end
end