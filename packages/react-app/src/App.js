import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import PatientDashboard from './pages/PatientDashboard/PatientDashboard';
import AppointmentPage from './pages/AppointmentPage/AppointmentPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/appointment">
          <AppointmentPage />
        </Route>
        <Route path="/">
          <PatientDashboard />
        </Route>
      </Switch>
    </Router>
  );
}
