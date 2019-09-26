# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :categories, shallow: true, except: %w[new edit] do
        resources :notes, except: %w[new edit]
      end
    end
  end

  # get '*page', to: 'static#index', constraints: ->(req) do
  #   !req.xhr? && req.format.html?
  # end
  root 'static#index'
end
