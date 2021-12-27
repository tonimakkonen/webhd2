import React from 'react';
import Select from 'react-select'
import Byte from './Byte.js'
import Line from './Line.js'
import './Viewer.css';

class Viewer extends React.Component {

  constructor(props) {
    super(props);
  }

  createDisplayData() {
    const bytes = [];
    var lineNumber = 1;
    for (var i = 0; i < this.props.fileData.length; i++) {
      var value = this.props.fileData[i];

      // First line:
      if (i === 0) {
        bytes.push(<Line lineNumber={lineNumber} index={i} key={"line"+lineNumber} />);
      }

      // We always push the current byte to the values
      bytes.push(<Byte value={value} index={i} linenumber={lineNumber} key={"byte"+i} />);

      // TODO: Hanlde cases where line end is marked by \n\r
      if (value === 10 || value === 13) {
        lineNumber += 1;
        bytes.push(<br key={"br"+lineNumber}/>);
        bytes.push(<hr key={"hr"+lineNumber}/>);
        bytes.push(<Line lineNumber={lineNumber} index={i} key={"line"+lineNumber} />);
      }
    }
    return bytes;
  }

  render() {

    const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

    if (!this.props.fileLoaded) {
      return (
        <div className="Viewer">
        <div className="no-file-loaded-text">No file loaded</div>
        </div>
      );
    } else {
      return (
        <div className="Viewer">
        <div className="text">File: {this.props.filePath}</div>
        <div className="text">Size in bytes: {this.props.fileData.length}</div>
        <Select options={options} />
        <hr/>
        {this.createDisplayData()}
        </div>
      );

    }
  }
}

export default Viewer;
