# frozen_string_literal: true

# Контроллер категорий
class Api::V1::CategoriesController < Api::V1::BaseController
  before_action :find_category, only: %i[show update destroy]

  def index
    @categories = Category.where(user: current_user).order(created_at: :desc)
    render 'index.json', status: :ok
  end

  def create
    category = Category.new(category_params)
    category.user = current_user
    category.save
    response = category
    render json: response, status: :created
  end

  def show
    render 'show.json', status: :ok
  end

  def update
    @category.update(category_params)

    render json: @category, status: :ok
  end

  def destroy
    @category.destroy

    head 204
  end

  def multiple_destroy
    @categories = Category.where(id: params.require(:category).permit(ids: [])[:ids],
                                 user: current_user)
    @categories.delete_all

    head 204
  end

  private

  def category_params
    params.require(:category).permit(:name, :color, :user_id)
  end

  def find_category
    @category = Category.find_by(id: params[:id])
    check_access_resource
  end

  def check_access_resource
    raise ActiveRecord::RecordNotFound unless @category && @category.user == current_user
  end
end
