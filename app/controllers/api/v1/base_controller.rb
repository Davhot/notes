# frozen_string_literal: true

# Базовый контроллер
class Api::V1::BaseController < ApplicationController
  resource_description do
    app_info 'Notes Api. Current version 1.0'
    api_version '1.0'
  end

  def render_not_found
    render json: { error: :not_found }, status: 404
  end

  def render_nothing
    render json: {}, status: 200
  end
end
