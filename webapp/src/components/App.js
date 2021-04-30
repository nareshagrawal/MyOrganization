import React from 'react';
import './App.scss';
import Login from './Login/login';


class App extends React.Component {

  render() {
    return (
      <div className="bg-dark vh-100">
        <Login {...this.props}></Login>
      </div>
    );
  }
}

export default App;