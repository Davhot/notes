# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.1'

gem 'devise', '~> 4.7.1'
gem 'devise-jwt'
gem 'jbuilder', github: 'rails/jbuilder'
gem 'pg', '~> 1.1.4'
gem 'puma', '~> 3.11'
gem 'rails', '~> 6.0.0'
gem 'react-rails'
gem 'sass-rails', '~> 5'
gem 'turbolinks', '~> 5'
gem 'webpacker', '~> 4.0'

gem 'font-awesome-rails'

gem 'bootsnap', '>= 1.4.2', require: false

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails'
  gem 'rspec-rails', '~> 3.8'
  gem 'rspec-rails-swagger'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'database_cleaner'
  gem 'rails-controller-testing'
  gem 'selenium-webdriver'
  gem 'shoulda-matchers'
  gem 'simplecov', require: false
  gem 'webdrivers'
end

gem 'apitome'
gem 'rspec_api_documentation'
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

# Use Capistrano for deployment
group :capistrano do
  gem 'capistrano', '3.9.0'
  gem 'capistrano-docker', git: 'https://github.com/netguru/capistrano-docker.git'
end
