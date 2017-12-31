class HomeController < ApplicationController
  skip_before_action :check_authenticate_user
  def index
  end
end
