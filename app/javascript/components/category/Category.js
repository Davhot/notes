import React from "react";
import images from '../images';
import AddCategoryForm from './AddCategoryForm'
import { connect } from "react-redux";

class Category extends React.Component {
  redirect_to_notes() {
    window.location.href = '/notes'
  }

  render () {
    return (
      <div className="card" style={{background: this.props.category.color}} onClick={() => this.redirect_to_notes()}>
        <p>{this.props.category.name}</p>
      </div>
    )
  }
}

export default Category;
