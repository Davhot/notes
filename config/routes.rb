# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
             path: '',
             path_names: {
               sign_in: 'login_api',
               sign_out: 'logout_api'
             },
             controllers: {
               sessions: 'sessions'
             }

  root 'static#index'
  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      delete 'notes/multiple_destroy', to: 'notes#multiple_destroy'
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
