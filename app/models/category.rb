class Category < ApplicationRecord
  has_many :notes

  validates :name, :color, presence: true
end
