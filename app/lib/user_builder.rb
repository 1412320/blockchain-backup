class UserBuilder
  def self.build
    builder = new
    yield(builder)
    builder.user
  end

  def initialize
    @user = User.new
  end

  def set_as_admin
    @user.role = 0
  end

  def set_as_member
    @user.role = 1
  end

  def set_used_tfa
    @user.used_tfa = true
  end

  def set_not_used_tfa
    @user.used_tfa = false
  end

  def set_email(email)
    @user.email = email  
  end

  def set_password(password)
    @user.password = password   
  end

  def set_password_confirmation(password_confirmation)
    @user.password_confirmation = password_confirmation    
  end

  def user
    @user
  end
end