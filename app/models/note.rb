class Note < ApplicationRecord
  belongs_to :category

  validates :body, presence: true
end
