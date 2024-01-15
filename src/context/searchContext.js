import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

//create context
const context = createContext();

// create custom provider
function SearchProvider({ children }) {
  // create state
  const [searchData, setSearchData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // why try not work when call wrapper fetch fun inside try?
  // because call async call store promise/microtask queue , and try/catch is sync code.
  useEffect(() => {
    if (searchText) {
      setLoading(true);
      const fetchWeather = async () => {
        try {
          const responseData = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${searchText}&appid=${"0259dc96fb66cf3d5392191c67fa9e24"}`,
          ); //https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=0259dc96fb66cf3d5392191c67fa9e24
          console.log("responseData", responseData);
          // const data = responseData.data;
          // console.log("searchText", data);
          // setSearchData(data);
          // setSearchText("");
        } catch (error) {
          console.log(error);
          setError(error);
          // toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchWeather();
    }
  }, [searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };
  return (
    <context.Provider value={{ searchData, searchText, handleSearch }}>
      <Toaster />
      {children}
    </context.Provider>
  );
}

// create custom hook to use context value
function useContextValue() {
  return useContext(context);
}

export { SearchProvider, useContextValue };
