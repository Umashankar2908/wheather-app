import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { AppContext } from ".";
import "./App.css";
import { BgImage } from "./components/BgImage";
import { DetailsSider } from "./components/DetailsSider";
import { Logo } from "./components/Logo";
import { TempDetails } from "./components/TempDetails";
import { BASE_URL, key } from "./utils/constants";

function App() {
  const [temperatureData, setTemperatureData] = useState({});
  const { location, setLoading } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await axios({
        method: "get",
        url: `${BASE_URL}forecast.json`,
        params: {
          key,
          lang: "en",
          q: `${location?.lat},${location?.lon}`,
        },
      })
        .then((res) => {
          if (res) {
            const data = {
              ...res?.data?.current,
              ...res?.data?.forecast?.forecastday?.[0]?.day,
              ...res?.data?.location,
            };
            setTemperatureData(data);
          }
        })
        .catch((err) => console.log(err));
      setLoading(false);
    })();
  }, [location]);

  return (
    <div className="h-[100vh] w-[100vw] min-w-[550px]">
      <BgImage />
      <Logo />
      <TempDetails temperatureData={temperatureData} />
      <DetailsSider data={temperatureData} />
    </div>
  );
}

export default App;
