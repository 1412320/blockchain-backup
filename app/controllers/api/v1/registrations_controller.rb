class Api::V1::RegistrationsController < Devise::RegistrationsController
  skip_before_action :check_authenticate_user, only: [:create, :new]
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    @params = params[:user]
    @user = create_user_by_builder
    if @user.save
      auth_token = JsonWebToken.encode(user_id: @user.id)
      render :json => {
        :user => @user.as_json(:only => [:id, :email]),
        :message => Message.account_created,
        :auth_token => auth_token,
      }
    else
      render json: {errors: @user.errors.full_messages}, status: 401
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
  private
  def create_user_by_builder   
    user = UserBuilder.build do |builder|
      builder.set_as_member
      builder.set_not_used_tfa
      builder.set_email(@params[:email])
      builder.set_password(@params[:password])
      builder.set_password_confirmation(@params[:password_confirmation])
    end
  end
end
