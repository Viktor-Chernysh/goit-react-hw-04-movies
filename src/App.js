import { Route, Switch } from "react-router";

import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Container from "./components/Container/Container";
import HomeViews from "./views/HomePage/HomeViews";
import MoviesViews from "./views/MoviesPage/MoviesView";
import { NotFound } from "./views/NotFoundView";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";

function App() {
  return (
    <div>
      <Container>
        <Navigation />

        <Switch>
          <Route exact path="/">
            <HomeViews />
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
      </Container>
    </div>
  );
}

export default App;
