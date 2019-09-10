# frozen_string_literal: true

Apipie.configure do |config|
  config.app_name                = 'NotesApi'
  config.api_base_url            = '/api'
  config.doc_base_url            = '/docs'
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/api/v1/*.rb"
  config.languages = %w[ru en]
end
