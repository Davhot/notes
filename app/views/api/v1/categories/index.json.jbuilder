# frozen_string_literal: true

json.data @categories do |category|
  json.id category.id
  json.name category.name
  json.color category.color
end
