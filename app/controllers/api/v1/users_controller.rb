class Api::V1::UsersController < ApplicationController
  def get_tfa_code
    render json: {tfa_code: current_user.otp_secret_key}
  end
end