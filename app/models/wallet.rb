class Wallet < ApplicationRecord
  belongs_to :user
  def real_amount
    @outputs = Output.where('receiver = ? and is_used = ?', self.address, false)
    if @outputs.present?
      sum = @outputs.sum(:amount)
    else
      sum = 0
    end
    return sum
  end
end
