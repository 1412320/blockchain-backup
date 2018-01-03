class Wallet < ApplicationRecord
  belongs_to :user
  def real_amount
    Output.where(receiver: self.address, is_used: false).sum(:amount)
  end

  def available_amount
    Output.get_confirm_receive.where(is_used: false).sum(:amount)
  end
end
