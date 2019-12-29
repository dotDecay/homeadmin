import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { RecipesApp } from './apps';
import Helmet from 'react-helmet';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Rezepte</title>
      </Helmet>
      <div>Home</div>
      <nav>
        <ul>
          <li>
            <Link to='/recipes'>Rezepte</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Rezepte</title>
      </Helmet>
      <div>Not Found</div>
    </>
  );
}

function App() {
  const user = true;

  return (
    <Router>
      <Switch>
        <Route path='/' component={HomePage} exact />
        {user && (
          // Recipe App
          <Route path='/recipes'>
            <RecipesApp mainPath='/recipes' />
          </Route>
        )}
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
