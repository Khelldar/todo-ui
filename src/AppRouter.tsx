import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TodosPage } from './pages/todos';
import { LoginPage } from './pages/login';
import { GoogleOauth } from './google';
import { UserContext } from './user/userContext';

export const AppRouter: React.FC = () => {
  const [state] = useContext(UserContext);
  return (
    <Router>
      <div>
        {state.state === 'loggedIn' && (
          <Switch>
            <Route path="/">
              <TodosPage />
            </Route>
          </Switch>
        )}
        {state.state !== 'loggedIn' && (
          <Switch>
            <Route path="/oauth/google">
              <GoogleOauth />
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
};
