import React from "react";
import images from '../images';
import CategoryForm from './CategoryForm'
import Category from './Category'
import { connect } from "react-redux";

class CategoryAppBody extends React.Component {
  render () {
    const mode = this.props.mode;
    if (mode == 'index' || mode == 'delete') {
      if (this.props.categories.length > 1) {
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

const mapStateToProps = (state) => {
  return {
    mode: state.mode,
    categories: state.categories
  }
}

export default connect(mapStateToProps)(CategoryAppBody);
