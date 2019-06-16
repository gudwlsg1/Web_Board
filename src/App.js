import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {Provider} from "mobx-react";

import './App.scss'

import Home from './Home';
import Stores from './Stores';
import Board from './Board';
import Profile from './Profile';

const App = () => (
  <Provider stores = {Stores}>
      <BrowserRouter>
          <header className='app-header'>
              <ul className='menu-bar'>
                  <li> <Link to='/'>Home</Link> </li>
                  <li> <Link to='/board'>게시판</Link> </li>
                  <li> <Link to='/user'>내정보</Link> </li>
              </ul>
          </header>

          <section className='app-body'>
              <Route path='/' exact component={Home}/>
              {/*<Route path='/board' exact component={Board} />
              <Route path='/board/view/:postid' exact component={Board} />
              <Route path='/board/add' exact component={Board} />
              <Route path='/board/edit/:postid' exact component={Board} />*/}
              <Route path='/board/:command?/:postid?' exact component={Board}/>
              <Route path='/user/:command?' exact component={Profile} />
          </section>
      </BrowserRouter>
  </Provider>
);

export default App;
