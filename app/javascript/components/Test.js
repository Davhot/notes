import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';

function getCategories() {
  console.log('getCategories Action!');
  return dispatch => {
    dispatch({ type: GET_CATEGORIES_REQUEST });
    return fetch(`api/v1/categories.json`)
      .then(response => response.json())
      .then(json => dispatch(getCategoriesSuccess(json)))
      .then(error => console.log(error));
  };
};

export function getCategoriesSuccess(json) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    json
  };
};

class Test extends React.Component {
  render () {
    const { categories } = this.props;
    const categoriesList = categories.map((category) => {
      return <li key={category.id}>{category.name} {category.color}</li>
    })

    return (
      <React.Fragment>
        <button className="getCategoriesBtn" onClick={() => this.props.getCategories()}>
          get categories
        </button>
        <br />
        <ul>{ categoriesList }</ul>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  categories: state => state.categories
});

const mapDispatchToProps = { getCategories };

export default connect(structuredSelector, mapDispatchToProps)(Test);
