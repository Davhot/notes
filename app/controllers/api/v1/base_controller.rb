# frozen_string_literal: true

# Базовый контроллер
class Api::V1::BaseController < ApplicationController
  def not_found
    render json: { error: 'not_found' }
  end
end
