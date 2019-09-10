# frozen_string_literal: true

# Базовый контроллер
class Api::V1::CategoriesController < Api::V1::BaseController
  before_action :find_category, only: %i[show update destroy]

  def_param_group :category do
    param :category, Hash, desc: "Информация о категории" do
      param :name, String, desc: 'название', required: true
      param :color, String, desc: 'цвет', required: true
    end
  end

  api :GET, '/v1/categories', 'Список категорий'
  def index
    response = Category.all

    render json: { categories: response }, status: :ok
  end

  api :POST, '/v1/categories', 'Создание категории'
  param_group :category
  def create
    response = Category.create(category_params)
    render json: response, status: :created
  end

  api :GET, '/v1/categories/:id', 'Категория'
  def show
    render json: @category, status: :ok
  end

  api :PUT, '/v1/categories/:id', 'Обновление категории'
  param_group :category
  def update
    @category.update(category_params)
    render_nothing
  end

  api :DELETE, '/v1/categories/:id', 'Удаление категории'
  def destroy
    @category.destroy
    render_nothing
  end

  private

  def category_params
    params.require(:category).permit(:name, :color)
  end

  def find_category
    @category = Category.find_by(id: params[:id])
    render_not_found unless @category
  end
end
