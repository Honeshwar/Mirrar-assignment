import { useRef, useState } from "react";
import styles from "../styles/searchAndView.module.css";
import { CiSearch } from "react-icons/ci";
import { useContextValue } from "../context/searchContext";
import debounce from "debounce";

export default function SearchAndView() {
  const { handleSearch, searchText } = useContextValue();
  const [text, setText] = useState(searchText);

  const { searchData } = useContextValue();
  const { list } = searchData || [];
  let m = new Map();
  list?.forEach((item) => {
    if (!m.has(new Date(item.dt_txt).getDay())) {
      m.set(new Date(item.dt_txt).getDay(), item);
    }
  });
  m = Array.from(m.values());
  m = m[0];

  const wrapperSearchHandler = (e) => {
    console.log("e", e);
    if (e.key === "Enter") {
      const sText = text.trim();
      console.log("text", sText);
      if (!sText) {
        return;
      }
      handleSearch(sText);
      setText("");
    } else {
      setText(e.target.value);
    }
  };
  // debounce(wrapperSearchHandler, 350);
  return (
    <div className={styles.searchAndView}>
      <h1 className={styles.title}>
        Discover the Weather in every city you go.
      </h1>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search for a city"
          id="searchInput"
          onKeyUp={wrapperSearchHandler}
          defaultValue={text}
        />
        <span className={styles.searchIcon}>
          <CiSearch />
        </span>
      </div>
      <div className={styles.view}>
        <div className={styles.temperature}>
          {Math.round(m?.main?.temp)} &deg;F
        </div>
        <div className={styles.icon}>
          <img
            src={`https://openweathermap.org/img/wn/${m?.weather[0]?.icon}@2x.png`}
            alt="weather icon"
          />
        </div>
        <div className={styles.description}>
          <span>{searchData?.city?.name},</span> {m?.weather[0]?.description}
        </div>
        <div className={styles.details}>
          <div className={styles.card}>
            <span>Wind</span>
            <span>{Math.round(m?.wind?.speed)} km/h</span>
          </div>
          <div className={styles.card}>
            <span>Direction</span>
            <span>{m?.wind?.deg}</span>
          </div>
          <div className={styles.card}>
            <span>Humidity</span>
            <span>{m?.main?.humidity}%</span>
          </div>
          <div className={styles.card}>
            <span>Temperature History</span>
            <span>min - {Math.round(m?.main?.temp_min)} °F</span>
            <span>max - {Math.round(m?.main?.temp_max)} °F</span>
          </div>
        </div>
      </div>
    </div>
  );
}
