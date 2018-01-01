require 'utils/parser'

module RSA
  def self.get_private_key_from_hex(private_key)
    pk = Parser.hex_to_s private_key
    OpenSSL::PKey::RSA.new pk
  end

  def self.get_public_key(private_key)
    pk = get_private_key_from_hex(private_key)
    pub = pk.public_key
  end

  def self.sign(message, private_key)
    algorithm = OpenSSL::Digest::SHA256.new
    pk = get_private_key_from_hex(private_key)
    sign = pk.sign(algorithm, message)
    sign.unpack('H*').first
  end
end