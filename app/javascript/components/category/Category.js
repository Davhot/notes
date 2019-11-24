import React from "react";
import { connect } from "react-redux";

import images from '../images';
import CategoryForm from './CategoryForm'
import { setMode, selectCategories } from "./CategoryActions"

class Category extends React.Component {
  constructor() {
    super()
    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.handleButtonRelease = this.handleButtonRelease.bind(this)
  }

  redirect_to_notes() {
    if (this.props.mode == 'index') {
      window.location.href = `categories/${this.props.category.id}/notes`
    } else {
      this.props.selectCategories([this.props.category.id]);
      let count_selected_categories = this.props.categories.filter(function(category) { return category.selected });
      if(count_selected_categories.length == 0) {
        this.props.setMode('index');
      }
    }
  }

  handleButtonPress() {
    const self = this;
    this.buttonPressTimer = setTimeout(() => self.props.setMode('delete'), 500);
  }

  handleButtonRelease () {
    clearTimeout(this.buttonPressTimer);
  }

  render () {
    let category_class = "card noselect";
    if (this.props.category.selected) { category_class += " checked" }
    return (
      <div className={category_class}
           style={{background: this.props.category.color}}
           onClick={() => this.redirect_to_notes()}
           onTouchStart={this.handleButtonPress}
           onTouchEnd={this.handleButtonRelease}
           onMouseDown={this.handleButtonPress}
           onMouseUp={this.handleButtonRelease}
           onMouseLeave={this.handleButtonRelease}>
        <p>{this.props.category.name}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

const mapDispatchToProps = { setMode, selectCategories }; // выносим методы отдельно от компонента

export default connect(mapStateToProps, mapDispatchToProps)(Category);
