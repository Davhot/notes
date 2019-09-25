FactoryBot.define do
  factory :category do
    sequence :name do |n|
      "New category #{n}"
    end
    color { '#ffffff' }
  end
end
