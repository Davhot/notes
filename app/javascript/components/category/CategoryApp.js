import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CategoryAppNav from "./CategoryAppNav"
import CategoryAppBody from "./CategoryAppBody"
import Footer from "../Footer"
import { getCategoriesRequest } from "./CategoryRequests" 

class CategoryApp extends React.Component {
  render () {
    this.props.getCategoriesRequest();
    return (
      <React.Fragment>
        <CategoryAppNav/>
        <CategoryAppBody/>
        <Footer/>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  mode: state => state.mode
});

const mapDispatchToProps = { getCategoriesRequest }; // выносим методы отдельно от компонента

export default connect(structuredSelector, mapDispatchToProps)(CategoryApp);
