import styles from "./styles/App.module.css";
import { Navbar, SearchAndView, FiveDayForecast } from "./components";
import { SearchProvider } from "./context/searchContext";

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <SearchProvider>
        <SearchAndView />
        <FiveDayForecast />
      </SearchProvider>
    </div>
  );
}

export default App;
