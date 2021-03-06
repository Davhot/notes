# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::NotesController, type: :controller do
  login_user

  render_views
  include ApiHelper

  let(:category) { create :category, user_id: User.first.id }
  let(:note) { create :note }

  before(:each) { note.category.update_attribute(:user_id, User.first.id) }

  describe 'POST create' do
    it 'render status 201' do
      post :create, params: { note: { body: 'Заметка 1' }, category_id: category.id }
      expect(response).to have_http_status(:success)
    end

    it 'check create' do
      post :create, params: { note: { body: 'Заметка 1' }, category_id: category.id }
      data = body.keys
      expect_fields = %w[id body category_id created_at updated_at]
      expect(data).to match_array(expect_fields)
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
      expect_fields = %w[id body category_id]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(3)
    end

    it 'check not found' do
      get :show, params: { id: 0 }
      expect(response).to have_http_status(404)
    end
  end

  describe 'Get #index' do
    it 'render status 200' do
      get :index, params: { category_id: category.id }
      expect(response).to have_http_status(:success)
    end

    it 'render all notes' do
      2.times { create :note }
      Note.update_all(category_id: category.id)

      get :index, params: { category_id: category.id }

      data = body['data']
      expect(data.size).to eq(3)
    end

    it 'check format' do
      2.times { create :note }
      Note.update_all(category_id: category.id)

      get :index, params: { category_id: category.id }

      data = body['data'][0].keys
      expect_fields = %w[id body category_id]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(3)
    end
  end

  describe 'Put #update' do
    it 'render status 200' do
      put :update, params: { id: note.id, note: { body: 'Заметка 2', category_id: category.id } }
      expect(response).to have_http_status(:success)
    end

    it 'check update category' do
      new_note = note
      note_category_id = category.id
      put :update, params: { id: new_note.id, note: { body: 'Заметка 2', category_id: note_category_id } }
      new_note.reload

      expect(new_note.body).to eq('Заметка 2')
      expect(new_note.category_id).to eq(note_category_id)
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

  describe 'Delete #multiple_destroy' do
    let(:ids) do
      3.times { create :note }
      Note.ids
    end

    it 'render status 200' do
      delete :multiple_destroy, params: { note: { ids: [note.id] } }
      expect(response).to have_http_status(:success)
    end

    it 'check multiple_destroy notes' do
      delete :multiple_destroy, params: { note: { ids: ids } }

      expect(Note.count).to eq(0)
    end
  end
end
