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
        <Switch>
          <Route path="/oauth/google">
            <GoogleOauth />
          </Route>

          {/* not sure how much sense this makes, but the "index" 
          page changes based on whether the user is logged in */}
          {state.state === 'loggedIn' && (
            <Route path="/">
              <TodosPage />
            </Route>
          )}
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
