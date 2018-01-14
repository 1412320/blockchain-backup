class TransferSuccessMailer < ApplicationMailer

		def execute(mailer_params)
			@user = mailer_params[:user]
			@receiver = mailer_params[:receiver]
			@amount = mailer_params[:amount]
			mail to: @user.email, subject: "Transfer KCoin successfully"
		end

end