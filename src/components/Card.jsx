import styles from "../styles/fiveDayForecast.module.css";

export default function Card({ data }) {
  console.log("data", data);
  console.log("day", new Date(data.dt_txt).getDay());

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className={styles.card}>
      <div className={styles.day}>{days[new Date(data.dt_txt).getDay()]}</div>
      <div className={styles.icon}>
        <img
          src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
          alt="weather icon"
        />
      </div>
      <div className={styles.description}>{data.weather[0].description}</div>
      <div className={styles.temperature}>
        {Math.round(data.main.temp)} &deg;F
      </div>
    </div>
  );
}
