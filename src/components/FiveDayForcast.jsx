import { useContextValue } from "../context/searchContext";
import styles from "../styles/fiveDayForecast.module.css";
import Card from "./Card";

export default function FiveDayForecast() {
  const { searchData } = useContextValue();
  const { list } = searchData || [];
  let m = new Map();
  list?.forEach((item) => {
    if (!m.has(new Date(item.dt_txt).getDay())) {
      m.set(new Date(item.dt_txt).getDay(), item);
    }
  });
  m = Array.from(m.values()).slice(1);
  return (
    <div className={styles.fiveDayForecast}>
      <h1 className={styles.title}>5-Day Forecast</h1>
      <div className={styles.cards}>
        {m?.map((item) => (
          <Card key={item} data={item} />
        ))}
      </div>
    </div>
  );
}
