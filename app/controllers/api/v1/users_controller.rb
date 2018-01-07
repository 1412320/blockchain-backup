class Api::V1::UsersController < ApplicationController
  def get_tfa_code
    render json: {tfa_code: current_user.otp_secret_key}
  end
  def turn_on_tfa
    @user = User.find(current_user.id);
    @user.used_tfa = true;
    @user.save
    render json: {message: "Turn on tfa authenticator successfully!"}, status: 200    
  end
end