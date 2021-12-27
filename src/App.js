
import React from 'react';
import Dropzone from 'react-dropzone';
import Viewer from './Viewer.js'
import Line from './Line.js'
import Byte from './Byte.js'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fileLoaded: false,
      fileData: [],
    }
  }

  handleFileLoaded = (data, filePath) => {
    var fileByteArray = [];
    var array = new Uint8Array(data);
    for (var i = 0; i < array.length; i++) {
      fileByteArray.push(array[i]);
    }
    this.setState({fileLoaded: true, fileData: fileByteArray, filePath: filePath})
  }

  onDrop = (acceptedFiles) => {
    var file = acceptedFiles[0]; // dropzone should only give one file
    var size = file.size;
    // Use some hard-coded limit for now to prevent freezing up the browser
    // TODO: This is reduntant as Dopzone has a limit?
    if (size > 2000000) {
      window.alert("File too big (500 kB is the limit)");
      return;
    }

    var reader = new FileReader();
    reader.onloadend = () => {
      this.handleFileLoaded(reader.result, file.path);
    }
    reader.readAsArrayBuffer(file);
  }

  render() {

    return (
      <div className="App">
      <Dropzone multiple={false} maxSize={500000} onDrop={this.onDrop}>
          {({getRootProps, getInputProps}) => (
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="dropzoneText">
              Click here to select a file (or drag it here) to inspect the binary contents.
              </div>
            </div>
          )}
      </Dropzone>
      <hr></hr>
      <Viewer fileLoaded={this.state.fileLoaded} fileData={this.state.fileData} filePath={this.state.filePath}/>
      </div>

    );
  }
}

export default App;
