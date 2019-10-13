import React from "react";
import images from '../images';

import Nav from "../Nav"

class CategoryAppNav extends React.Component {
  render () {
    const mode = this.props.mode;
    if (mode == 'show') {
      return (
        <Nav>
          <a id='choose-all-btn' className="delete-mode-btn hidden" href="#">
            <i className="fa fa-square"></i>
            choose all
          </a>
          <a id='delete-btn' className="delete-mode-btn hidden" href="#">
            <i className="fa fa-times"></i>
            delete
          </a>
          <button id='add-category-btn' onClick={() => this.props.setEditMode()}>
            <i className="fa fa-plus"></i>
            add category
          </button>
        </Nav>
      )
    } else {
      return (
        <Nav>
          <button id='cancel-btn' onClick={() => this.props.setShowMode()}>
            cancel
          </button>
        </Nav>
      )
    }
  }
}

export default CategoryAppNav;
