# frozen_string_literal: true

# Базовый контроллер
class Api::V1::CategoriesController < ApplicationController
  before_action :find_category, only: %i[show update destroy]

  def index
    response = Category.all # TODO: через jbuilder передавать id, name, color

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
    @category.update(category_params)

    head 204
  end

  def destroy
    @category.destroy

    head 204
  end

  private

  def category_params
    params.require(:category).permit(:name, :color)
  end

  def find_category
    @category = Category.find_by(id: params[:id])
    render json: { error: :not_found }, status: 404 unless @category
  end
end
