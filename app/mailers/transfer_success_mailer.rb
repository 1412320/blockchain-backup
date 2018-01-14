class TransferSuccessMailer < ApplicationMailer
	def execute(user, receiver, value)
		@user = user
		@receiver = receiver
		@value = value
		mail to: user.email, subject: "Transfer KCoin successfully"
	end
end