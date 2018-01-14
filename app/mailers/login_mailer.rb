class LoginMailer < ApplicationMailer

	def execute(mailer_params)
		@user = mailer_params[:user]
		mail to: @user.email, subject: "Login successfully"
	end
	
end