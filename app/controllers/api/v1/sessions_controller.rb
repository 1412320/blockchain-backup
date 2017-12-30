class Api::V1::SessionsController < Devise::SessionsController
  skip_before_action :check_authenticate_user, only: :create  
  # POST /resource/sign_in
  def create
    @user = User.find_by(email: params[:email])
    if (@user.present?)
      if @user.valid_password?(params[:password])
        if @user.confirmed_at.present?
          auth_token = JsonWebToken.encode(user_id: @user.id)
          if @user.authenticate_otp(params[:otp_code])
            response = {auth_token: auth_token, user: @user}
            render json: response
          else
            response = {message: "Invalid google authenticator code!", status: 401}
            render json: response
          end
        else 
          response = {message: "You have to confirm your account before sign in!", status: 401}          
          render json: response
        end
      else
        response = {message: "Invalid password!", status: 401}                  
        render json: response
      end
    else
      response = {message: "Invalid email!", status: 401}                  
      render json: response      
    end
  end
  def authenticate_2_step
    @user = User.find(params[:user_id])    
    if @user.authenticate_otp(params[:otp_code].to_s)
      response = {auth_token: auth_token, user: @user }      
    else
      render json: "Invalid google authenticator code!", status: 401
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