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
      get 'system-confirmed-transactions', :to =>'transactions#system_confirmed_transactions'
      get 'system-pending-transactions', :to =>'pending_transactions#system_pending_transactions'
      devise_scope :user do
       post 'authenticate_2_step', :to => 'sessions#authenticate_2_step'
      end
      get 'get-tfa-code', :to => 'users#get_tfa_code'
      resources :transactions, only: [:create, :index, :show] do
        get 'me', on: :collection
      end
      resources :pending_transactions, only: [:index, :destroy] do
        post 'confirm', on: :member
      end
    end
  end
  get 'users/password/edit/:token', to: 'api/v1/passwords#reset'
  get 'transactions/:id', to: 'api/v1/pending_transactions#index'
  root to: 'home#index'

end
