class Wallet < ApplicationRecord
  belongs_to :user
  def real_amount
    Output.where(receiver: self.address, is_used: false).sum(:amount)
  end

  def available_amount
    amount = Output.get_confirm_receive(address).where(is_used: false).sum(:amount)
    pending = PendingTransaction.where(user_id: user_id).sum(:amount)
    amount - pending
  end
end
