import React from "react";
import { connect } from "react-redux";

import images from '../images';
import CategoryForm from './CategoryForm'
import { setMode, selectCategories } from "./CategoryActions"

class Category extends React.Component {
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

  long_press_card_mouseup() {
    clearTimeout(this.pressTimer);
    return false;
  }

  long_press_card_mousedown() {
    const self = this;
    this.pressTimer = window.setTimeout(function() {
      self.props.setMode('delete');
    }, 500);
    return false;
  }

  render () {
    let category_class = "card noselect";
    if (this.props.category.selected) { category_class += " checked" }
    return (
      <div className={category_class}
           style={{background: this.props.category.color}}
           onMouseUp={() => this.long_press_card_mouseup()}
           onMouseDown={() => this.long_press_card_mousedown()}
           onClick={() => this.redirect_to_notes()}>
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
