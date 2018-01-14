class LoginMailer < ApplicationMailer
	def execute(user)
		@user = user
		mail to: @user.email, subject: "Login successfully"
	end
end