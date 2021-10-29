import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

export default function Navigation() {
  return (
    <header>
      <nav>
        <ul className={s.NavigationList}>
          <li>
            <NavLink
              exact
              to="/"
              className={s.Link}
              activeClassName={s.ActiveLink}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={s.Link}
              activeClassName={s.ActiveLink}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
