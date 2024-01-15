import styles from "../styles/navbar.module.css";
import { CiSearch } from "react-icons/ci";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>Weather App</div>
      <label htmlFor="searchInput" className={styles.search}>
        <span className={styles.icon}>
          <CiSearch />
        </span>
        Search
      </label>
    </div>
  );
}
