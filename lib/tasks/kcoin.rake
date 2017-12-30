require 'net/http'
require 'json'

namespace :kcoin do
  BASE_URL = 'https://api.kcoin.club'

  desc "Sync server data with kcoin server"
  task sync: :environment do
    data = get_json('/blocks', limit: 2)
    data.each do |d|
      p d
    end
  end

end

def get_json(endpoint, params = {})
  uri = URI(BASE_URL + endpoint)
  uri.query = URI.encode_www_form(params) if params
  response = Net::HTTP.get_response(uri)
  p response['x-total-count']
  JSON.parse(response.body)
end