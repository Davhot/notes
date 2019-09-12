# frozen_string_literal: true

class StaticController < ApplicationController
  layout 'layouts/application'
  def index
    render component: 'HelloWorld', props: { greeting: "Hello" }, layout: 'layouts/application'
  end
end
