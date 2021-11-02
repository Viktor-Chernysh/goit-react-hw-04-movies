import { Route, Switch } from 'react-router';
import { lazy } from 'react';
import Loader from 'react-loader-spinner';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Container from './components/Container/Container';
// import HomePage from './views/HomePage/HomePage';
// import MoviesViews from './views/MoviesView/MoviesView';
import { NotFound } from './views/NotFoundView';
import MovieDetailsPage from './components/MovieDetailsPage/MovieDetailsPage';
import { Suspense } from 'react';
import s from './components/MovieDetailsPage/MovieDetailsPage.module.css';

const HomePage = lazy(() => import('./views/HomePage/HomePage'));
const MoviesViews = lazy(() => import('./views/MoviesView/MoviesView'));

function App() {
  return (
    <div>
      <Container>
        <Navigation />

        <Suspense
          fallback={
            <Loader
              className={s.Loader}
              type="BallTriangle"
              color="#f38021"
              height={100}
              width={100}
            />
          }
        >
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/movies">
              <MoviesViews />
            </Route>

            <Route path="/movies/:movieId">
              <MovieDetailsPage />
            </Route>

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
