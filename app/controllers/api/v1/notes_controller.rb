# frozen_string_literal: true

# Контроллер заметок
class Api::V1::NotesController < Api::V1::BaseController
  before_action :find_note, only: %i[show update destroy]
  before_action :find_category, only: %i[index create]

  def index
    @notes = @category.notes.order(created_at: :desc)
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

    render json: @note, status: :ok
  end

  def destroy
    @note.destroy

    head 204
  end

  def multiple_destroy
    @notes = Note.where(id: params.require(:note).permit(ids: [])[:ids])
    @notes.delete_all

    head 204
  end

  private

  def note_params
    params.require(:note).permit(:body, :category_id)
  end

  def find_category
    @category = Category.find(params[:category_id])
    check_access_category
  end

  def find_note
    @note = Note.find_by(id: params[:id])
    check_access_note
  end

  def check_access_category
    raise ActiveRecord::RecordNotFound unless @category.user == current_user
  end

  def check_access_note
    raise ActiveRecord::RecordNotFound unless @note && @note.category.user == current_user
  end
end
