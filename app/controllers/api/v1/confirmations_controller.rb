class Api::V1::ConfirmationsController < Devise::ConfirmationsController
  skip_before_action :check_authenticate_user, only: :show    
  # GET /resource/confirmation/new
  # def new
  #   super
  # end

  # POST /resource/confirmation
  # def create
  #   super
  # end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])
    if resource.errors.empty?
      message = "Confirm account successfully!"
      status = :ok
    else
      message = "Invalid confirmation url!"
      status = 401
    end
    response = {message: message, status: status}
    render json: response
  end
end