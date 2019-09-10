# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::NotesController, type: :controller do
  include ApiHelper

  let(:category) { create :category }
  let(:note) { create :note }

  describe 'POST create' do
    it 'render status 200' do
      post :create, params: { note: { body: 'Заметка 1', category_id: category.id } }
      expect(response).to have_http_status(:success)
    end

    it 'check create' do
      post :create, params: { note: { body: 'Заметка 1', category_id: category.id } }
      expect(Note.count).to eq(1)
    end
  end

  describe 'Get #show' do
    it 'render status 200' do
      get :show, params: { id: note.id }
      expect(response).to have_http_status(:success)
    end

    it 'check format' do
      get :show, params: { id: note.id }
      data = body.keys
      expect_fields = %w[id body category_id created_at updated_at]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(5)
    end
  end

  describe 'Get #index' do
    it 'render status 200' do
      get :index
      expect(response).to have_http_status(:success)
    end

    it 'render all notes' do
      2.times { create :note }

      get :index

      data = body['notes']
      expect(data.size).to eq(2)
    end
  end

  describe 'Put #update' do
    it 'render status 200' do
      put :update, params: { id: note.id, note: { body: 'Заметка 2', category_id: category.id } }
      expect(response).to have_http_status(:success)
    end

    it 'check update category' do
      put :update, params: { id: note.id, note: { body: 'Заметка 2', category_id: category.id } }

      expect(Note.last.body).to eq('Заметка 2')
      expect(Note.last.category_id).to eq(category.id)
    end
  end

  describe 'Delete #destroy' do
    it 'render status 200' do
      delete :destroy, params: { id: note.id }
      expect(response).to have_http_status(:success)
    end

    it 'check destroy category' do
      delete :destroy, params: { id: note.id }

      expect(Note.count).to eq(0)
    end
  end
end
