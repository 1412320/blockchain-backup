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
       get 'wallet', :to => 'wallets#show'
    end
  end
  root to: 'home#index'
end
