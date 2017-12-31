require 'net/http'
require 'json'

class KcoinCrawler
  BASE_URL = 'https://api.kcoin.club'
  
  def self.parse_json(response)
    JSON.parse(response.body)
  end
  
  def self.get_data(endpoint, params = {})
    uri = URI(BASE_URL + endpoint)
    uri.query = URI.encode_www_form(params) if params
    response = Net::HTTP.get_response(uri)
  end
end