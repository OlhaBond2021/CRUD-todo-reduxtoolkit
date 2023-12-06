/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";

const MainNavigation = ({
  pages,
  prevPageHandler,
  nextPageHandler,
  setCurrentPage,
  totalPages,
  currentPage,
}) => {
  let pagesToDisplay = pages;

  if (pages.length > 5) {
    pagesToDisplay = [
      currentPage - 1 > 0 ? currentPage - 1 : null,
      currentPage,
      currentPage + 1 <= totalPages ? currentPage + 1 : null,
    ].filter(Boolean);
  }

  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        end
      >
        Todo list
      </NavLink>
      <ul className={styles.list}>
        <li>
          <NavLink to={`/${setCurrentPage}`} onClick={prevPageHandler}>
            Prev
          </NavLink>
        </li>
        {pagesToDisplay.map((page) => (
          <li key={page}>
            <NavLink
              to={`/${page}`}
              key={page}
              onClick={() => setCurrentPage(page)}
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              {page}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink to={`/${setCurrentPage}`} onClick={nextPageHandler}>
            Next
          </NavLink>
        </li>
      </ul>
      <p>Total pages: {totalPages}</p>
    </nav>
  );
};

export default MainNavigation;
