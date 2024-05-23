import React, { useEffect, useState } from "react";
import { AppContext } from "..";
import { Loader } from "./Loader";

export const Layout = ({ children }) => {
  const [locale, setLocale] = useState("en");
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLocation({ lat: latitude, lon: longitude });
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function error() {
      setLocation({});
      console.log("Unable to retrieve your location");
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ locale, setLocale, location, setLocation, loading, setLoading }}
    >
      <Loader loading={loading}>{children}</Loader>
    </AppContext.Provider>
  );
};
