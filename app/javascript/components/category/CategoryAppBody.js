import React from "react";
import images from '../images';
import AddCategoryForm from './AddCategoryForm'
import Category from './Category'
import { connect } from "react-redux";

class CategoryAppBody extends React.Component {
  redirect_to_notes() {
    window.location.href = '/notes'
  }

  render () {
    const mode = this.props.mode;
    if (mode == 'show') {
      return (
        <div className="container">
          {this.props.categories.map((category) => <Category key={category.id} category={category} />)}
        </div>
      )
    } else {
      return (
        <div className="container">
          <AddCategoryForm/>
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
