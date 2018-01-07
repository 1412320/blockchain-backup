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
      redirect_to root_path
    else
      render json: {errors: "Invalid confirmation url!"}, status: 401
    end
  end
end