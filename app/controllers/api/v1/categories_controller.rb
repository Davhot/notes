# frozen_string_literal: true

# Базовый контроллер
class Api::V1::CategoriesController < ApplicationController
  before_action :find_category, only: %i[show update]

  def index
    response = Category.all

    render json: response, status: :ok
  end

  def create
    response = Category.create(category_params)
    render json: response, status: :created
  end

  def show
    render json: @category, status: :ok
  end

  def update
    @category.update(contact_params)

    render :nothing, status: :ok
  end

  private

  def category_params
    params.require(:data).permit(:name, :color)
  end

  def find_category
    @category = Category.find_by(id: params[:id])
    render json: { error: :not_found }, status: 404 unless @category
  end
end
