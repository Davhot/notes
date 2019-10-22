import React from 'react'
import { SketchPicker } from 'react-color'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';

function createCategory(data) {
  console.log('createCategories Action!');
  console.log(data)
  return dispatch => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    return fetch('api/v1/categories', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // тип данных в body должен соответвовать значению заголовка "Content-Type"
    }).then(response => response.json())
      .then(json => dispatch(createCategorySuccess(json)))
      .then(error => console.log(error));
  };
};

export function createCategorySuccess(json) {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    json
  };
};

function setEditMode() {
  console.log('setEditMode Action!');
  return dispatch => {
    dispatch({ type: SET_EDIT_MODE_REQUEST });
    return dispatch(setEditModeSuccess());
  };
};

export function setEditModeSuccess() {
  console.log('setEditModeSuccess Action!');
  return {
    type: SET_EDIT_MODE_SUCCESS,
    mode: 'edit'
  };
};

class AddCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.getColor = this.getColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getColor(color, event) {
    this.color = color['hex']
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log()
    const name = this.getTitle.value
    const color = this.color
    const data = {
      id: new Date(),
      name,
      color
    }
    console.log(data)
    this.props.createCategory(data)
  }

  render () {
    this.color = '#000'
    return (
      <form className="category-form" onSubmit={this.handleSubmit}>
        <div className="category-body">
          <input type="text" className="category-body-input" ref={input => this.getTitle = input} placeholder="Category Title..."/>
        </div>
        <div id="colorpicker-wrapper">
          <p>Choose color:</p>
          <SketchPicker
            color={ this.color }
            onChangeComplete={ this.getColor }
            width="300px" />
        </div>
        <input type="submit" className="category-button" value="Submit"/>
      </form>
    )
  }
}

// обязательно указываем те параметры, которые используются для текущего компонента
// если нет функций для привязки, то можно просто через ф-ю, как в CategoryAppBody
function mapStateToProps(state) {
  return state
}

const mapDispatchToProps = { createCategory }; // выносим методы отдельно от компонента

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AddCategoryForm); // благодаря connect() можно использовать dispatch
