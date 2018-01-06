class Api::V1::AdminController < ApplicationController
  before_action :has_permission_to_do
  def all_user_infos
    @users = User.where("id != ?", current_user.id )
    users_info = Array.new
    @users.each do |user|
      users_info.push({
        user: user,
        address: user.wallet.address,
        real_amount: user.wallet.real_amount,
        available_amount: user.wallet.available_amount
      })
    end
    page = params[:page_number].to_i
    p page
    render json: users_info[10*(page-1),10]
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
