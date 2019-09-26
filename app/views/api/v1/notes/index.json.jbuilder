# frozen_string_literal: true

json.data @notes do |note|
  json.id note.id
  json.body note.body
  json.category_id note.category_id
end
