class Api::V1::PasswordsController < Devise::PasswordsController
  # POST /resource/password
  skip_before_action :check_authenticate_user  
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    p resource_params
    if successfully_sent?(resource)
      message = "An reset password url has been sent to your mail!"
      status = :ok      
    else
      message = "Invalid email!"
      status = 401      
    end    
    response = {message: message, status: status}
    render json: response
  end
  # GET /resource/password/edit?reset_password_token=abcdef
  def edit
    self.resource = resource_class.new
    set_minimum_password_length
    resource.reset_password_token = params[:reset_password_token]
    render json: params[:reset_password_token]
  end

  # PUT /resource/password
  def update
    self.resource = resource_class.reset_password_by_token(params[resource_name])
    set_minimum_password_length
    if resource.errors.empty?
      message = "An reset password url has been sent to your mail!"
      status = :ok    
    else
      message = resource.errors
      status = 401 
    end
    response = {message: message, status: status}
    render json: response
  end

end
