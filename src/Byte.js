import React from 'react';

import './Byte.css';

class Byte extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      binary: this.getBinary(this.props.value),
      ascii: this.getAscii(this.props.value),
      hex: this.getHex(this.props.value),
      bytenumber: this.props.bytenumber
    };
  }

  getBinary(value) {
    var str = value.toString(2);
    if (str.length < 8) {
        str = "0".repeat(8-str.length) + str;
    }
    return str;
  }

  getAscii(value) {
    if (value >= 33 && value <= 126) {
      return String.fromCharCode(value);
    } else if (value === 32) {
      return " ";
    } else if (value === 10) {
      return "\\n";
    } else if (value === 13) {
      return "\\r";
    } else {
        return "...";
    }
  }

  getHex(value) {
    var ret = value.toString(16);
    if (ret.length === 1) ret = "0" + ret;
    return ret;
  }

  getBgColor(value) {
    // ASCII white space characters
    if (value === 9 || value === 10 || value === 11 || value === 12 ||
      value === 13 || value === 32) {
        return "#ffffff";
    }
    // constrol characters (that are not whitespace)
    if (value <= 31 || value === 127) {
      return "#ffe0e0";
    }
    // Everything based on whether high bit set or not
    if (value < 127) {
      return "#f0f0f0";
    } else {
      return "#e0e0ff";
    }
  }

  render() {
    return (
      <div className="Byte" style={{backgroundColor:this.getBgColor(this.props.value)}}>
      <span class="tooltiptext">{this.state.binary}</span>
      {this.state.ascii}
      <br />
      {this.state.hex}
      </div>
    );
  }
}

export default Byte;
