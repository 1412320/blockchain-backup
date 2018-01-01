module Parser
  def self.hex_to_s(hex)
    hex.scan(/../).map { |x| x.hex.chr }.join
  end

  def self.pub_to_address(public_key)
    pub = hex_to_s(public_key)
    OpenSSL::Digest::SHA256.hexdigest pub
  end
end