# frozen_string_literal: true

# Модель категорий
class Category < ApplicationRecord
  belongs_to :user, required: false
  has_many :notes, dependent: :destroy

  validates :name, :color, presence: true
end
