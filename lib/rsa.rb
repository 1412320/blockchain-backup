require 'parser'

module RSA
  def self.get_key_from_hex(key)
    pk = Parser.hex_to_s key
    OpenSSL::PKey::RSA.new pk
  end

  def self.get_public_key(private_key)
    pk = get_key_from_hex(private_key)
    pub = pk.public_key
  end

  def self.sign(message, private_key)
    algorithm = OpenSSL::Digest::SHA256.new
    pk = get_key_from_hex(private_key)
    sign = pk.sign(algorithm, message)
    sign.unpack('H*').first
  end

  def self.verify(message, sign, public_key)
    algorithm = OpenSSL::Digest::SHA256.new
    pub = get_key_from_hex public_key
    sign = Parser.hex_to_s sign
    pub.verify(algorithm, sign, message)
  end
end