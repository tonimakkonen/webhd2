import React from 'react';

import './Line.css';

class Line extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lineNumber: this.props.lineNumber,
      index: this.props.index,
    };
  }

  render() {
    return (
      <div className="Line">
      line {this.state.lineNumber}<br/>byte {this.state.index}
      </div>
    );
  }
}

export default Line;
