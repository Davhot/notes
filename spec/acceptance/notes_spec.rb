# frozen_string_literal: true

require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource 'Notes' do
  explanation 'Категории'

  header 'Accept', 'application/json'
  header 'Content-Type', 'application/json'

  let(:note) { create :note }
  let(:category) { create :category }

  # INDEX
  get '/api/v1/categories/:category_id/notes' do
    parameter :category_id, 'id категории', type: :integer, required: true

    let(:category_id) { category.id }

    response_field :id, type: :integer
    response_field :body, 'Тело заметки', type: :string
    response_field :category_id, 'id категории', type: :integer

    before do
      2.times { create :note }
      Note.update_all(category_id: category.id)
    end

    example_request 'INDEX' do
      expect(status).to eq(200)
    end
  end

  # SHOW
  get '/api/v1/notes/:id' do
    let(:id) { note.id }

    response_field :id, type: :integer
    response_field :body, 'Тело заметки', type: :string
    response_field :category_id, 'id категории', type: :integer

    example_request 'SHOW' do
      expect(status).to eq(200)
    end
  end

  # CREATE
  post '/api/v1/categories/:category_id/notes' do
    parameter :category_id, 'id категории', type: :integer, required: true

    parameter :id, type: :string, required: true
    parameter :body, 'Тело заметки', type: :string, required: true
    parameter :category_id, 'id категории', type: :string, required: true

    let(:body) { 'Note 1' }
    let(:category_id) { category.id }

    let(:raw_post) { params.to_json }

    example_request 'CREATE' do
      explanation 'First, create an note, then make a later request to get it back'

      note = JSON.parse(response_body)
      expect(note.except('id', 'created_at', 'updated_at')).to eq(
        'body' => body,
        'category_id' => category_id
      )
      expect(status).to eq(201)
    end
  end

  # UPDATE
  put '/api/v1/notes/:id' do
    with_options scope: :note, with_example: true do
      parameter :body, 'Тело заметки', type: :string, required: true
      parameter :category_id, 'id категории', type: :string, required: true
    end

    let(:id) { note.id }
    let(:body) { 'Note 1' }
    let(:category_id) { category.id }

    let(:raw_post) { params.to_json }

    example_request 'UPDATE' do
      expect(status).to eq(204)
    end
  end

  # DELETE
  delete '/api/v1/notes/:id' do
    let(:id) { note.id }

    example_request 'DELETE' do
      expect(status).to eq(204)
    end
  end

  # Multiple DELETE
  delete '/api/v1/notes/multiple_destroy' do
    with_options scope: :note, with_example: true do
      parameter :ids, 'Идентификаторы заметок', type: :array, required: true
    end

    let(:ids) do
      3.times { create :note }
      Note.ids
    end

    let(:raw_post) { params.to_json }

    example_request 'Multiple DELETE' do
      expect(status).to eq(204)
    end
  end
end
