# frozen_string_literal: true

# Модель заметок
class Note < ApplicationRecord
  belongs_to :category

  validates :body, presence: true
end
