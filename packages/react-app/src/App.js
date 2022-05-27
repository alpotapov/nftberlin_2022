import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import MainPage from './pages/MainPage/MainPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}
