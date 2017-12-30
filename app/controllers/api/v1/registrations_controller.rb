class Api::V1::RegistrationsController < Devise::RegistrationsController
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user
    else
      render json: @user.errors.full_messages, status: 401
    end
  end  
  private
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
  def generate_random(number)
    charset = Array('A'..'Z') + Array('a'..'z')
    Array.new(number) { charset.sample }.join
  end
end