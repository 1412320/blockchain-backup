module Parser
  def self.hex_to_s(hex)
    hex.scan(/../).map { |x| x.hex.chr }.join
  end

  def self.s_to_hex(str)
    str.unpack('H*').first
  end

  def self.pub_to_address(public_key)
    pub = hex_to_s(public_key)
    OpenSSL::Digest::SHA256.hexdigest pub
  end

  def self.i_to_buff(integer)
    [integer].pack('l*').reverse
  end

  def self.ui_to_buff(integer)
    [integer].pack('L*').reverse
  end
end