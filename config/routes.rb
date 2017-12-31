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
        post "sign_up", :to => 'registrations#create'
        post "sign_in_2_step", :to => 'sessions#authenticate_2_step'        
        post "sign_in", :to => 'sessions#create'
        delete "sign_out", :to => 'sessions#destroy'
      end
    end
  end
  get 'hello_world', to: 'hello_world#index'
  get 'home', to: 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
