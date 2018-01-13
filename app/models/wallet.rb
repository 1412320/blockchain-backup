class Wallet < ApplicationRecord
  belongs_to :user
  include WalletDecorator
end
