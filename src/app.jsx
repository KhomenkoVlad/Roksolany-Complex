import React from 'react';
import ReactDOM from 'react-dom';

import {
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom'

import {
  HomePage,
  AboutPage,
  ContactsPage,
  NewsPage,
  Kolorit,
  Koliba,
  Harchev,
  Podvirja
} from './components/pages'

window.React = React

export const App = () =>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contacts" component={ContactsPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/kolorit" component={Kolorit} />
      <Route path="/koliba" component={Koliba} />
      <Route path="/harchev" component={Harchev} />
      <Route path="/podvirja" component={Podvirja} />
    </Switch>
  </BrowserRouter>