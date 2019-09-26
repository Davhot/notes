# frozen_string_literal: true

# Контроллер заметок
class Api::V1::NotesController < Api::V1::BaseController
  before_action :find_note, only: %i[show update destroy]
  before_action :find_category, only: %i[index create]

  def index
    @notes = @category.notes
    render 'index.json', status: :ok
  end

  def create
    response = @category.notes.create(note_params)
    render json: response, status: :created
  end

  def show
    render 'show.json', status: :ok
  end

  def update
    @note.update(note_params)

    head 204
  end

  def destroy
    @note.destroy

    head 204
  end

  private

  def note_params
    params.require(:note).permit(:body, :category_id)
  end

  def find_category
    @category = Category.find(params[:category_id])
  end

  def find_note
    @note = Note.find_by(id: params[:id])
    render json: { error: :not_found }, status: 404 unless @note
  end
end
