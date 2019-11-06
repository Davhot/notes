# frozen_string_literal: true

Rails.application.routes.draw do
  root 'static#index'
  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :categories, shallow: true, except: %w[new edit] do
        collection do
          delete :multiple_destroy
        end
        resources :notes, except: %w[new edit]
      end
    end
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
