import React from 'react'
import { SketchPicker } from 'react-color'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "isomorphic-fetch"
import toaster from 'toasted-notes';

import { createCategorySuccess, editCategorySuccess, setMode } from "./CategoryActions"

function createCategoryRequest(data) {
  return dispatch => {
    return fetch('/api/v1/categories', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(json => dispatch(createCategorySuccess(json)))
      .then(error => console.log(error));
  };
};

function editCategoryRequest(data) {
  return dispatch => {
    return fetch(`/api/v1/categories/${data.category_id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(json => dispatch(editCategorySuccess(json)))
      .then(error => console.log(error));
  };
};

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.getColor = this.getColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getColor(color, event) {
    this.color = color['hex']
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = this.getTitle.value;
    const color = this.color;
    const { mode, current_category_id } = this.props;

    let notify_message = null;
    const data = {
      id: current_category_id,
      name,
      color
    }

    if (mode == 'new') {
      this.props.createCategoryRequest(data);
      notify_message = 'Успешно создано!';
    } else {
      data.category_id = current_category_id;
      this.props.editCategoryRequest(data);
      notify_message = 'Успешно обновлено!';
    }

    this.getTitle.value = '';
    this.props.setMode('index');
    toaster.notify(notify_message, { duration: 2000, position: 'top-right' });
  }

  render () {
    this.color = '#000';
    let category_name = null;
    const { mode, current_category_id, categories } = this.props;
    if (mode == 'editCategory') {
      let category = categories.filter(function(category) { return category.id == current_category_id })[0]
      category_name = category.name;
      this.color = category.color
    }
    return (
      <form className="category-form" onSubmit={this.handleSubmit}>
        <div className="category-body">
          <input type="text"
                 className="category-body-input"
                 ref={input => this.getTitle = input}
                 placeholder="Category Title..."
                 defaultValue={category_name} />
        </div>
        <div id="colorpicker-wrapper">
          <p>Choose color:</p>
          <SketchPicker
            color={ this.color }
            onChangeComplete={ this.getColor }
            width="300px" />
        </div>
        <input type="submit" className="form-button" value="Submit"/>
      </form>
    )
  }
}

// обязательно указываем те параметры, которые используются для текущего компонента
// если нет функций для привязки, то можно просто через ф-ю, как в CategoryAppBody
function mapStateToProps(state) {
  return state
}

// выносим методы отдельно от компонента
const mapDispatchToProps = { createCategoryRequest, editCategoryRequest, setMode };

// благодаря connect() можно использовать dispatch
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(CategoryForm);
