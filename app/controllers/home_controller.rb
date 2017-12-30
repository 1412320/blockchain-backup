class HomeController < ApplicationController
  def index
    welcome = {user: current_user}
    render json: welcome
  end
end
