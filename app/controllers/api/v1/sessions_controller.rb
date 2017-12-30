class Api::V1::SessionsController < Devise::SessionsController
  # POST /resource/sign_in
  def create
    @user = User.find_by(wallet_id: params[:user][:wallet_id])
    if (@user.present?)
      if @user.valid_password?(params[:user][:password])
        sign_in(:user, @user)
        render json: @user
      else
        render json: "Invalid password!", status: 401
      end
    else
      render json: "Invalid wallet id!", status: 401      
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