# frozen_string_literal: true

# Базовый контроллер
class Api::V1::NotesController < Api::V1::BaseController
  before_action :find_note, only: %i[show update destroy]

  def index
    response = Note.all

    render json: { notes: response }, status: :ok
  end

  def create
    response = Note.create(note_params)
    render json: response, status: :created
  end

  def show
    render json: @note, status: :ok
  end

  def update
    @note.update(note_params)
    render_nothing
  end

  def destroy
    @note.destroy
    render_nothing
  end

  private

  def note_params
    params.require(:note).permit(:body, :category_id)
  end

  def find_note
    @note = Note.find_by(id: params[:id])
    render_not_found unless @note
  end
end
