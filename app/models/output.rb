class Output < ApplicationRecord
  belongs_to :trans, foreign_key: :output_ref, primary_key: :hash_str, class_name: 'Transaction'

  def self.get_confirm_receive(wallet_hash)
    includes(:trans).where(
      transactions: { is_confirm: true },
      receiver: wallet_hash 
    )
  end

  def self.get_confirm_send(wallet_hash)
    includes(:trans).where(
      transactions: { is_confirm: true },
      sender: wallet_hash 
    )
  end
  
  def self.usable(wallet_hash)
    includes(:trans).where(
      transactions: { is_confirm: true },
      receiver: wallet_hash,
      is_used: false
    )
  end

end
