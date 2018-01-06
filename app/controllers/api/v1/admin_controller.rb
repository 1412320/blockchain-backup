class Api::Vcurrent_user.id::AdminController < ApplicationController
  def all_user_infos
    @wallets = Wallet.where("user_id != ?", current_user.id )
    wallets_info = Array.new
    @wallets.each do |wallet|
      wallets_info.push({
        address: wallet.address,
        real_amount: wallet.real_amount,
        available_amount: wallet.available_amount
      })
    end
    render json: wallets_info
  end

end
