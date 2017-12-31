class Api::V1::WalletsController < ApplicationController
  def show
    wallet = Wallet.find_by(user_id: current_user.id)
    response = {wallet_address: wallet.address, status: :ok}
    render json: response
  end
end