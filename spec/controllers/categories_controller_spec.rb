# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::CategoriesController, type: :controller do
  login_user

  render_views
  include ApiHelper

  let(:category) { create(:category, user_id: User.first.id) }

  describe 'POST create' do
    it 'render status 200' do
      post :create, params: { category: { name: 'Категория 1', color: 'white' } }
      expect(response).to have_http_status(:success)
    end

    it 'check create' do
      post :create, params: { category: { name: 'Категория 1', color: 'white' } }
      expect(Category.count).to eq(1)
      expect(Category.last.user.present?).to be_present
    end
  end

  describe 'Get #show' do
    it 'render status 200' do
      get :show, params: { id: category.id }
      expect(response).to have_http_status(:success)
    end

    it 'check format' do
      get :show, params: { id: category.id, format: :json }
      data = body.keys
      expect_fields = %w[id name color]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(3)
    end

    it 'render 404 on deny category for user' do
      new_category = create(:category, user_id: create(:user).id)
      create(:category, user_id: create(:user).id)
      get :show, params: { id: new_category.id }
      expect(response).to have_http_status(404)
    end
  end

  describe 'Get #index' do
    let(:user) { create(:user) }

    it 'render status 200' do
      get :index, format: :json
      expect(response).to have_http_status(:success)
    end

    it 'render all categories for user' do
      2.times { create :category, user_id: User.first.id }

      3.times { create :category, user_id: user.id }

      get :index, format: :json

      data = body['data']
      expect(data.size).to eq(2)
    end

    it 'check format' do
      2.times { create :category, user_id: User.first.id }

      get :index, format: :json

      data = body['data'][0].keys
      expect_fields = %w[id name color]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(3)
    end
  end

  describe 'Put #update' do
    it 'render status 200' do
      put :update, params: { id: category.id, category: { name: 'Категория 2', color: 'black' } }
      expect(response).to have_http_status(:success)
    end

    it 'check update category' do
      put :update, params: { id: category.id, category: { name: 'Категория 2', color: 'black' } }

      expect(Category.last.name).to eq('Категория 2')
      expect(Category.last.color).to eq('black')
    end
  end

  describe 'Delete #destroy' do
    it 'render status 200' do
      delete :destroy, params: { id: category.id }
      expect(response).to have_http_status(:success)
    end

    it 'check destroy category' do
      delete :destroy, params: { id: category.id }

      expect(Category.count).to eq(0)
    end
  end

  describe 'Delete #multiple_destroy' do
    let(:ids) do
      3.times { create :category, user_id: User.first.id }
      Category.ids
    end

    it 'render status 200' do
      delete :multiple_destroy, params: { category: { ids: [category.id] } }
      expect(response).to have_http_status(:success)
    end

    it 'check multiple_destroy categories' do
      delete :multiple_destroy, params: { category: { ids: ids } }

      expect(Category.count).to eq(0)
    end
  end
end
