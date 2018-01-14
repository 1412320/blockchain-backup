class ReceiveMailer < ApplicationMailer

  def execute(mailer_params)
    @user = mailer_params[:user]
    @receiver = mailer_params[:receiver]
    @amount = mailer_params[:amount]
    mail to: @receiver.email, subject: "Receive KCoin successfully"
  end

end
