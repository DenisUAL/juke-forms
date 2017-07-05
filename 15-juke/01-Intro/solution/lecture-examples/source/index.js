console.log('hello there!')
import React from 'react';
import ReactDom from 'react-dom';
import Menu from './Menu';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const current = this.state.visible;
    this.setState({visible: !current});
  }


  render() {
    return (
      <Menu toggle={this.toggle} visible={this.state.visible}/>

    )
  }

}

ReactDom.render(<App />, document.getElementById('app'));
