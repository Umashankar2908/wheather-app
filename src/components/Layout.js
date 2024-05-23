import React, { useEffect, useState } from "react";
import { AppContext } from "..";
import { Loader } from "./Loader";

export const Layout = ({ children }) => {
  const [locale, setLocale] = useState("en");
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [showEnableLocation, setShowEnableLocation] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            setShowEnableLocation("do not show");
            navigator.geolocation.getCurrentPosition(success, error);
            //If granted then you can directly call your function here
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, error);
            setShowEnableLocation("show");
          } else if (result.state === "denied") {
            setShowEnableLocation("show");
            //If denied then you have to show instructions to enable location
          }
        });
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setShowEnableLocation("do not show");
      setLocation({ lat: latitude, lon: longitude });
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function error() {
      setLocation({});
      setShowEnableLocation("show");
      console.log("Unable to retrieve your location");
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ locale, setLocale, location, setLocation, loading, setLoading }}
    >
      {showEnableLocation === "show" && (
        <div className="h-[100vh] w-[100vw] flex-col flex z-[9999999] justify-center items-center bg-white">
          <img src="access-icon.png" alt="" height={"40%"} width={"40%"} />
          <div className="text-[40px] font-primary font-[700] pt-[40px]">
            Please Allow Location access
          </div>
        </div>
      )}
      {showEnableLocation !== "show" && (
        <Loader loading={loading}>{children}</Loader>
      )}
    </AppContext.Provider>
  );
};
