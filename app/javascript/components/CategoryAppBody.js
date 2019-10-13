import React from "react";
import images from './images';
import { SketchPicker } from 'react-color'

class CategoryAppBody extends React.Component {
  redirect_to_notes() {
    window.location.href = '/notes'
  }

  get_color(color, event) {
    console.log(color);
  }

  render () {
    const mode = this.props.mode;
    if (mode == 'show') {
      return (
        <div className="container">
          <div className="card red" onClick={() => this.redirect_to_notes()}>
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
      )
    } else {
      return (
        <div className="container">
          <form className="category-form">
            <div className="category-body">
              <input type="text" className="category-body-input" placeholder="Category Title..."/>
            </div>
            <div id="colorpicker-wrapper">
              <p>Choose color:</p>
              <SketchPicker
                onChangeComplete={ this.get_color }
                width="300px" />
            </div>
            <input type="submit" className="category-button" value="Submit"/>
          </form>
        </div>
      )
    }
  }
}

export default CategoryAppBody;
