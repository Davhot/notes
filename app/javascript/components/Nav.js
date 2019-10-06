import React from "react";

class Nav extends React.Component {
  render () {
    return (
      <header>
        <div id="logo" data-link="./index.html">
          <strong>Notes</strong>
        </div>
        <nav>
          { this.props.children }
        </nav>
      </header>
    );
  }
}

export default Nav;
