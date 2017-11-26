import React, { Component } from 'react';
import SearchEgo from './SearchEgo';
import ListPage from './youthList/ListPage';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
          <div className="container">
            <header className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to="/" className="navbar-brand">EGO 2.0</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                  <Link to="/" className="nav-link">Ojeador de juveniles</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/youth-list" className="nav-link">Listas</Link>
                  </li>
                </ul>
                <ul className="navbar-nav">
                  <li className="nav-item float-right dropdown">
                    <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="oi oi-person"></span> ElDesnombrado
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <a className="dropdown-item" href=""><span className="oi oi-account-logout"></span> Salir</a>
                    </div>
                  </li>
                </ul>
              </div>
            </header>

            <div className="card">
              <div className="card-body">
                <Route exact path="/" component={SearchEgo}/>
                <Route path="/youth-list" component={ListPage}/>
              </div>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;
