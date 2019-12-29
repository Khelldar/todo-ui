import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { UserProvider } from './userContext';

import { TodosPage } from './pages/todos';
import { LoginPage } from './pages/login';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">login</Link>
              </li>
              <li>
                <Link to="/todos">todos</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/todos">
              <TodosPage />
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
