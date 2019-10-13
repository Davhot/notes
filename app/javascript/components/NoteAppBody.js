import React from "react";
import images from './images';
import Select from 'react-select';

class NoteAppBody extends React.Component {
  redirect_to_notes() {
    window.location.href = '/notes'
  }

  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };

  render () {
    const mode = this.props.mode;
    if (mode == 'show') {
      return (
        <div className="container">
          <div className="card red">
            <p className="notes-content">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo...</p>
          </div>
          <div className="card orange">
            <p className="notes-content">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo...</p>
          </div>
          <div className="card blue">
            <p className="notes-content">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo...</p>
          </div>
          <div className="card orange">
            <p className="notes-content">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo...</p>
          </div>
          <div className="card blue">
            <p className="notes-content">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo...</p>
          </div>
          <div className="card red">
            <p className="notes-content">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo...</p>
          </div>
          <div className="card blue">
            <p className="notes-content">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo...</p>
          </div>
          <div className="card red">
            <p className="notes-content">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo...</p>
          </div>
          <div className="card orange">
            <p className="notes-content">Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo...</p>
          </div>
        </div>
      )
    } else {
      var options = [];
      for(var i = 1; i < 6; i++) {
        options.push({label: "category " + i, value: i})
      }
      const { selectedOption } = this.state;
      return (
        <div className="container">
          <form className="note-form">
            <div className="note-body">
              <Select value={selectedOption}
                      onChange={this.handleChange}
                      options={options} />
            </div>
            <div className="note-body">
              <textarea className="note-body-input" placeholder="Please enter body..."></textarea>
            </div>
            <input type="submit" className="category-button" value="Submit" />
          </form>
        </div>
      )
    }
  }
}

export default NoteAppBody;
