import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./components/App";
import SearchPage from "./SearchPage";
import Pokedex from './components/cardPokedex';

class Router extends Component {
    render() {
      return (
        <HashRouter>
          <div>
            <h1>Pokezdededex</h1>
            <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/pokedex">Pokedex</NavLink></li>
              <li><NavLink to="/search">Search Pokemon</NavLink></li>
            </ul>
            <div className="content">
              <Route path="/" component={Home}/>
              <Route path="/pokedex" component={Pokedex}/>
              <Route path="/search" component={SearchPage}/>
            </div>
          </div>
        </HashRouter>
      );
    }
  }
  
  export default Router;