# frozen_string_literal: true

# Модель категорий
class Category < ApplicationRecord
  has_many :notes

  validates :name, :color, presence: true
end
