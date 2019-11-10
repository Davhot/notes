import React from "react";
import images from '../images';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Nav from "../Nav"
import { setMode, selectCategories, deleteCategoriesSuccess } from "./CategoryActions"

function deleteCategoriesRequest(category_ids) {
  return dispatch => {
    return fetch('api/v1/categories/multiple_destroy', {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(category_ids)
    }).then(response => dispatch(deleteCategoriesSuccess()))
      .catch(error => console.log(error));
  }
};

class CategoryAppNav extends React.Component {
  constructor(props) {
    super(props);
    this.chooseAllCategories = this.chooseAllCategories.bind(this);
    this.delete_categories = this.delete_categories.bind(this);
  }

  chooseAllCategories() {
    let categories, category_ids;
    if(!this.isChoosenAll()) {
      categories = this.props.categories.filter(function(category) { return !category.selected });
    } else {
      categories = this.props.categories;
      this.props.setMode('index')
    }
    category_ids = categories.map(function(category){ return category.id })
    this.props.selectCategories(category_ids);
  }

  isChoosenAll() {
    let n = this.props.categories.length;
    let n_selected = this.props.categories.filter(function(category) { return category.selected }).length
    return n == n_selected
  }

  delete_categories() {
    var category_ids = this.props.categories.filter(function(category) { return category.selected })
                                            .map(function(category) { return category.id });
    category_ids = { category: { ids: category_ids } };
    this.props.deleteCategoriesRequest(category_ids);
  }

  render () {
    const mode = this.props.mode;
    let delete_mode_class = "delete-mode-btn";
    if (mode != 'delete') { delete_mode_class += " hidden" }
    let choose_all_btn_icon = this.isChoosenAll() ? "fa fa-check-square" : "fa fa-square";
    if (mode == 'index' || mode == 'delete') {
      return (
        <Nav>
          <button id='choose-all-btn' className={delete_mode_class} onClick={this.chooseAllCategories}>
            <i className={choose_all_btn_icon}></i>
            choose all
          </button>
          <button id='delete-btn' className={delete_mode_class} onClick={this.delete_categories}>
            <i className="fa fa-times"></i>
            delete
          </button>
          <button id='add-category-btn' onClick={() => this.props.setMode('new')}>
            <i className="fa fa-plus"></i>
            add category
          </button>
        </Nav>
      )
    } else {
      return (
        <Nav>
          <button id='cancel-btn' onClick={() => this.props.setMode('index')}>
            cancel
          </button>
        </Nav>
      )
    }
  }
}

const structuredSelector = createStructuredSelector({
  mode: state => state.mode,
  categories: state => state.categories
});

const mapDispatchToProps = { setMode, selectCategories, deleteCategoriesRequest, deleteCategoriesSuccess }; // выносим методы отдельно от компонента

export default connect(structuredSelector, mapDispatchToProps)(CategoryAppNav);
