# frozen_string_literal: true

Rails.application.routes.draw do
  apipie

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :notes
      resources :categories
    end
  end
end
