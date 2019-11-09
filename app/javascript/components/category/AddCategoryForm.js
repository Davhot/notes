import React from 'react'
import { SketchPicker } from 'react-color'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "isomorphic-fetch"
import toaster from 'toasted-notes';

import { createCategorySuccess, setMode } from "./CategoryActions"

function createCategoryRequest(data) {
  return dispatch => {
    return fetch('api/v1/categories', {
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
    const name = this.getTitle.value
    const color = this.color
    const data = {
      id: new Date(),
      name,
      color
    }
    this.props.createCategoryRequest(data);
    this.getTitle.value = '';
    this.props.setMode('show');
    toaster.notify('Успешно создано!', { duration: 2000, position: 'top-right' });
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

const mapDispatchToProps = { createCategoryRequest, setMode }; // выносим методы отдельно от компонента

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(AddCategoryForm); // благодаря connect() можно использовать dispatch
