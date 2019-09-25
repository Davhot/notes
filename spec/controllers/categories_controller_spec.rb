# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::CategoriesController, type: :controller do
  include ApiHelper

  let(:category) { create :category }

  describe 'POST create' do
    it 'render status 200' do
      post :create, params: { category: { name: 'Категория 1', color: 'white' } }
      expect(response).to have_http_status(:success)
    end

    it 'check create' do
      post :create, params: { category: { name: 'Категория 1', color: 'white' } }
      expect(Category.count).to eq(1)
    end
  end

  describe 'Get #show' do
    it 'render status 200' do
      get :show, params: { id: category.id }
      expect(response).to have_http_status(:success)
    end

    it 'check format' do
      get :show, params: { id: category.id }
      data = body.keys
      expect_fields = %w[id name color created_at updated_at]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(5)
    end
  end

  describe 'Get #index' do
    it 'render status 200' do
      get :index
      expect(response).to have_http_status(:success)
    end

    it 'render all categories' do
      2.times { create :category }

      get :index

      data = body['categories']
      expect(data.size).to eq(2)
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
end