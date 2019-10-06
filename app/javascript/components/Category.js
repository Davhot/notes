import React from "react";

import Nav from "./Nav"
import Footer from "./Footer"

class Category extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Nav>
          <a className="delete-mode-btn hidden" href="#">
            <i className="fa fa-square"></i>
            choose all
          </a>
          <a className="delete-mode-btn hidden" href="#">
            <i className="fa fa-times"></i>
            delete
          </a>
          <a href="./add_category.html">
            <i className="fa fa-plus"></i>
            add category
          </a>
        </Nav>
        <div className="container">
          <div className="card red">
            <p>Title category</p>
          </div>
          <div className="card orange">
            <p>Title category</p>
          </div>
          <div className="card blue">
            <p>Title category</p>
          </div>
          <div className="card orange">
            <p>Title category</p>
          </div>
          <div className="card blue">
            <p>Title category</p>
          </div>
          <div className="card red">
            <p>Title category</p>
          </div>
          <div className="card blue">
            <p>Title category</p>
          </div>
          <div className="card red">
            <p>Title category</p>
          </div>
          <div className="card orange">
            <p>Title category</p>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Category;
