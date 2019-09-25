# frozen_string_literal: true

FactoryBot.define do
  factory :note do
    sequence :body do |n|
      "New note #{n}"
    end
    category { create :category }
  end
end
