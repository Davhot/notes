# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Note, type: :model do
  it { should belong_to(:category) }
  it 'exists attributes' do
    expect(subject.attributes).to include('id')
    expect(subject.attributes).to include('body')
    expect(subject.attributes).to include('category_id')
    expect(subject.attributes).to include('created_at')
    expect(subject.attributes).to include('updated_at')
  end
end
