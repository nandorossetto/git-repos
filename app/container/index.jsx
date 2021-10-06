import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/app.scss';

import SearchUsers from '../components/search-users';
 
class App extends React.Component {
  constructor(){
    super();
    
  }

  render() {
    return (
      <div id="main">
        <SearchUsers />
      </div>
    )
  }
}
 
ReactDOM.render(<App />, document.getElementById('app'));