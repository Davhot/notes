# frozen_string_literal: true

# Базовый контроллер
class Api::V1::NotesController < Api::V1::BaseController
  before_action :find_note, only: %i[show update destroy]

  def_param_group :note do
    param :note, Hash, desc: "Информация о заметке" do
      param :body, String, desc: 'тело заметки', required: true
      param :category_id, String, desc: 'категория', required: true
    end
  end

  api :GET, '/v1/notes', 'Список заметок'
  def index
    response = Note.all

    render json: { notes: response }, status: :ok
  end

  api :POST, '/v1/notes', 'Создание заметки'
  param_group :note
  def create
    response = Note.create(note_params)
    render json: response, status: :created
  end

  api :GET, '/v1/notes/:id', 'Категория'
  def show
    render json: @note, status: :ok
  end

  api :PUT, '/v1/notes/:id', 'Обновление заметки'
  param_group :note
  def update
    @note.update(note_params)
    render_nothing
  end

  api :DELETE, '/v1/notes/:id', 'Удаление заметки'
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
