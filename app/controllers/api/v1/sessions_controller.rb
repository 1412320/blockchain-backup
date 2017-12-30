class Api::V1::SessionsController < Devise::SessionsController
  skip_before_action :check_authenticate_user, only: :create  
  # POST /resource/sign_in
  def create
    @user = User.find_by(email: params[:email])
    if (@user.present?)
      if @user.valid_password?(params[:password])
        auth_token = JsonWebToken.encode(user_id: @user.id)
        response = {auth_token: auth_token, user: @user }
        render json: response
      else
        render json: "Invalid password!", status: 401
      end
    else
      render json: "Invalid email!", status: 401      
    end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end