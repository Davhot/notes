require 'swagger_helper'

RSpec.describe 'Categories', type: :request do
  path '/api/v1/categories' do
    get(summary: 'Get categories') do
      consumes 'application/json'
      produces 'application/json'
      tags :categories

      let!(:categories) do
        3.times { create(:category) }
      end

      response(200, description: 'Return all the available categories') do
        it 'Return 3 categories' do
          body = JSON(response.body)
          expect(body.count).to eq(3)
        end
      end
    end

    post(summary: 'Create a new category') do
      consumes 'application/json'
      produces 'application/json'
      tags :categories

      parameter :data,
                in: :body,
                required: true,
                schema: {
                  '$ref' => '#/definitions/category'
                }

      response(201, description: 'Category created') do
        let(:data) do
          {
            data: {
              name: 'my example category',
              color: 'red'
            }
          }
        end
      end
    end
  end

  path '/api/v1/categories/{id}' do
    get(summary: 'Get Category') do
      consumes 'application/json'
      produces 'application/json'
      tags :categories

      parameter :id, in: :path, type: :integer, required: true, description: 'category ID'

      parameter :data,
                in: :body,
                required: true,
                schema: {
                  '$ref' => '#/definitions/category'
                }

      let(:category_1) do
        create(:category)
      end

      let(:category_2) do
        create(:category)
      end

      response(200, description: 'Return the selected category') do
        let(:id) { category_1.id }

        let(:data) do
          {
            data: {
              name: 'some category',
              color: 'red'
            }
          }
        end
      end

      response(404, description: 'category not found') do
        let(:id) { 999 }

        let(:data) do
          {
            data: {
              name: 'some category',
              color: 'red'
            }
          }
        end
      end
    end
  end
end
