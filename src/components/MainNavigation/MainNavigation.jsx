/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { CiSquareChevLeft } from "react-icons/ci";
import { CiSquareChevRight } from "react-icons/ci";
import styles from "./MainNavigation.module.css";

// MainNavigation component for displaying navigation links
const MainNavigation = ({
  pages,
  prevPageHandler,
  nextPageHandler,
  setCurrentPage,
  totalPages,
  currentPage,
}) => {
  // Calculate which pages to display based on the current page
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
            <CiSquareChevLeft />
          </NavLink>
        </li>
        {pagesToDisplay.map((page) => (
          <li key={page}>
            <NavLink
              to={`/${page}`}
              key={page}
              end
              onClick={() => setCurrentPage(page)}
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              {`${page}/${totalPages}`}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink to={`/${setCurrentPage}`} onClick={nextPageHandler}>
            <CiSquareChevRight />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
