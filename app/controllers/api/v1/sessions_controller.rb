class Api::V1::SessionsController < Devise::SessionsController
  skip_before_action :check_authenticate_user, only: [:create, :authenticate_2_step, :new]
  # POST /resource/sign_in
  def create
    @user = User.find_by(email: params[:user][:email])
    if (@user.present?)
      if @user.valid_password?(params[:user][:password])
        if @user.confirmed_at.present?
          auth_token = JsonWebToken.encode(user_id: @user.id)
          if @user.used_tfa
            render json: @user.as_json(:only => [:id, :email, :used_tfa])
          else
            render :json => {
              :user => @user.as_json(:only => [:id, :email, :used_tfa]),
              :auth_token => auth_token
            }, status: 200
          end
          mailer_params = {
            user: @user
          }
          login_mail(mailer_params)
        else
          render json: {errors: "You have to confirm your account before sign in!"}, status: 401
        end
      else
        render json: {errors: "Invalid password!"}, status: 401
      end
    else
      render json: {errors: "Invalid email!"} , status: 401
    end
  end
  def authenticate_2_step
    @user = User.find(params[:user_id])
    auth_token = JsonWebToken.encode(user_id: @user.id)
    if @user.authenticate_otp(params[:otp_code].to_s)
      render :json => {
        :user => @user.as_json(:only => [:id, :email, :used_tfa]),
        :auth_token => auth_token,
      }
    else
      render json: {errors: "Invalid google authenticator code!"}, status: 401
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
  private
  def login_mail(mailer_params)
    LoginMailer.execute(mailer_params).deliver
  end
end
