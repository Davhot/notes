import React from 'react'
import { SketchPicker } from 'react-color'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "isomorphic-fetch"

import { setMode } from "./CategoryActions"
import { createCategoryRequest, editCategoryRequest } from "./CategoryRequests"

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
    } else {
      data.category_id = current_category_id;
      this.props.editCategoryRequest(data);
    }

    this.getTitle.value = '';
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
