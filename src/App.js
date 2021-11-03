import { Route, Switch } from 'react-router';
import { lazy, Suspense } from 'react';
import Loader from 'react-loader-spinner';

import './App.css';
import Navigation from './components/Navigation/Navigation';
import Container from './components/Container/Container';
import s from './components/MovieDetailsPage/MovieDetailsPage.module.css';

const HomePage = lazy(() =>
  import('./views/HomePage/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesViews = lazy(() =>
  import('./views/MoviesView/MoviesView' /* webpackChunkName: "movie-views" */),
);
const NotFound = lazy(() =>
  import('./views/NotFoundView' /* webpackChunkName: "not-found" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */
  ),
);

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
