class Api::Vcurrent_user.id::AdminController < ApplicationController
  before_action :has_permission_to_do
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
  def system_info
    user_count = User.where("id != ?", current_user.id).count
    system_real_amount = Output.real_amount.sum(:amount)
    system_available_amount = Output.available_amount.sum(:amount)
    render json: {user_count: user_count, system_real_amount: system_real_amount, system_available_amount: system_available_amount}
  end
  private
  def has_permission_to_do
    if (current_user.role != 0)
      render json: {errors: "You don't have permission to do this action!"}, status: 401
    end
  end
end
