import React from "react";
import images from './images';

import Nav from "./Nav"

class CategoryAppNav extends React.Component {
  render () {
    const mode = this.props.mode;
    if (mode == 'show') {
      return (
        <Nav>
          <a className="delete-mode-btn hidden" href="#">
            <i className="fa fa-square"></i>
            choose all
          </a>
          <a className="delete-mode-btn hidden" href="#">
            <i className="fa fa-times"></i>
            delete
          </a>
          <button onClick={() => this.props.setEditMode()}>
            <i className="fa fa-plus"></i>
            add category
          </button>
        </Nav>
      )
    } else {
      return (
        <Nav>
          <button onClick={() => this.props.setShowMode()}>
            cancel
          </button>
        </Nav>
      )
    }
  }
}

export default CategoryAppNav;
