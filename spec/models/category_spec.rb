# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Category, type: :model do
  it { should have_many :notes }
  it 'exists attributes' do
    expect(subject.attributes).to include('id')
    expect(subject.attributes).to include('name')
    expect(subject.attributes).to include('color')
    expect(subject.attributes).to include('created_at')
    expect(subject.attributes).to include('updated_at')
  end
end
