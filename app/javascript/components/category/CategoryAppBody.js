import React from "react";
import images from '../images';
import CategoryForm from './CategoryForm'
import Category from './Category'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class CategoryAppBody extends React.Component {
  render () {
    const mode = this.props.mode;
    if (mode == 'index' || mode == 'delete') {
      if (this.props.categories.length > 0) {
        return (
          <div className="container">
            {this.props.categories.map((category) => <Category key={category.id} category={category} />)}
          </div>
        )
      } else {
        return (
          <div className="container">
            <div>
              <p>Нет категорий.</p>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className="container">
          <CategoryForm/>
        </div>
      )
    }
  }
}

const structuredSelector = createStructuredSelector({
  mode: state => state.mode,
  categories: state => state.categories
});

export default connect(structuredSelector)(CategoryAppBody);
