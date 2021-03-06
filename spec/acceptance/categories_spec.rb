# frozen_string_literal: true

require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource 'Categories' do
  include Devise::Test::IntegrationHelpers
  before(:each) { sign_in create(:user) }

  explanation 'Категории'

  header 'Accept', 'application/json'
  header 'Content-Type', 'application/json'

  let(:category) { create :category, user_id: User.first.id }

  # INDEX
  get '/api/v1/categories' do
    response_field :id, type: :integer
    response_field :name, 'Название', type: :string
    response_field :color, 'Цвет', type: :string

    before do
      2.times { create :category }
    end

    example_request 'INDEX' do
      expect(status).to eq(200)
    end
  end

  # SHOW
  get '/api/v1/categories/:id' do
    let(:id) { category.id }

    response_field :id, type: :integer
    response_field :name, 'Название', type: :string
    response_field :color, 'Цвет', type: :string

    example_request 'SHOW' do
      expect(status).to eq(200)
    end
  end

  # CREATE
  post '/api/v1/categories' do
    with_options scope: :category, with_example: true do
      parameter :name, 'Название', type: :string, required: true
      parameter :color, 'Цвет', type: :string, required: true
    end

    let(:name) { 'Category 1' }
    let(:color) { '#ffffff' }

    let(:raw_post) { params.to_json }

    example_request 'CREATE' do
      explanation 'First, create an category, then make a later request to get it back'

      category = JSON.parse(response_body)
      expect(category.except('id', 'created_at', 'updated_at', 'user_id')).to eq(
        'name' => name,
        'color' => color
      )
      expect(status).to eq(201)
    end
  end

  # UPDATE
  put '/api/v1/categories/:id' do
    with_options scope: :category, with_example: true do
      parameter :name, 'Название', type: :string, required: true
      parameter :color, 'Цвет', type: :string, required: true
    end

    let(:id) { category.id }
    let(:name) { 'Category 2' }
    let(:color) { '#ffffff' }

    let(:raw_post) { params.to_json }

    example_request 'UPDATE' do
      expect(status).to eq(200)
    end
  end

  # DELETE
  delete '/api/v1/categories/:id' do
    let(:id) { category.id }

    example_request 'DELETE' do
      expect(status).to eq(204)
    end
  end

  # Multiple DELETE
  delete '/api/v1/categories/multiple_destroy' do
    with_options scope: :category, with_example: true do
      parameter :ids, 'Идентификаторы категорий', type: :array, required: true
    end

    let(:ids) do
      3.times { create :category }
      Category.ids
    end

    let(:raw_post) { params.to_json }

    example_request 'Multiple DELETE' do
      expect(status).to eq(204)
    end
  end
end
