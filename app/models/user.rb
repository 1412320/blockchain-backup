class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  after_create :generate_address
  has_one_time_password
  has_one :wallet
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable
  def generate_address
    response =  KcoinCrawler.get_data('/generate-address')
    data = KcoinCrawler.parse_json(response)
    self.wallet = Wallet.create(address: data['address'], public_key: data['publicKey'], private_key: data['privateKey'])
  end
end
