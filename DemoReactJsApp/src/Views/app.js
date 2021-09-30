import React from 'react';
import ServiceProvider from '../Controller/servicesProvider';
import "../Css/app.css";
import DashBoard from './dashBoard';


class App extends React.Component {

  render() {
    return (
      <>
        <DashBoard />
      </>
    );
  }
}

export default App;