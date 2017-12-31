Rails.application.routes.draw do
  devise_for :users, :controllers =>
  {
    :registrations => 'api/v1/registrations',
    :sessions  => 'api/v1/sessions',
    :confirmations => 'api/v1/confirmations',
    :passwords => 'api/v1/passwords'
  }
  namespace :api do
    namespace :v1 do
      devise_scope :user do
        post 'signup', :to => 'registrations#create'
        post 'signin', :to => 'sessions#create'
        delete 'signout', :to => 'sessions#destroy'
        post 'sign_in_2_step', :to => 'sessions#authenticate_2_step'
      end
    end
  end
  root to: 'home#index'
end
