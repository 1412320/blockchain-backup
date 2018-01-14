source 'https://rubygems.org'
ruby "2.4.2"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.4'
gem 'mysql2', '>= 0.3.18', '< 0.5'
gem 'puma', '~> 3.7'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'
gem 'react_on_rails', '10.0.2'
gem 'devise'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'jwt'
gem 'active_model_otp'
gem 'bootstrap', '4.0.0.beta2.1'
gem 'jquery-rails'
gem 'font-awesome-rails'
gem 'figaro'
gem 'whenever', require: false
gem 'redis', '~> 3.0'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
end

group :production do
  gem 'pg'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'mini_racer', platforms: :ruby
