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
      get 'all-users-info', :to => 'admin#all_user_infos'      
      get 'system-info', :to => 'admin#system_info'      
      devise_scope :user do
       post 'authenticate_2_step', :to => 'sessions#authenticate_2_step'
      end
      get 'tfa_code', :to => 'users#get_tfa_code'
      resources :transactions, only: [:create, :index, :show] do
        get 'my', on: :collection  
      end
      resources :pending_transactions, only: [:index]
    end
  end
  get 'users/password/edit/:token', to: 'api/v1/passwords#reset'
  root to: 'home#index'

end
