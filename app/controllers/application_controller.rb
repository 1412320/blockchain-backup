class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token
  before_action :check_authenticate_user
  alias_method :devise_current_user, :current_user
  
  private
  def check_authenticate_user
    if !current_user.present?
      render json: Message.unauthorized
    end
  end
  def current_user
    user = (AuthorizeApiRequest.new(request.headers).call)[:user]
  end
end
