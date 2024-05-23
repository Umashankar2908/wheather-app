import React, { useContext } from "react";
import { AppContext } from "..";
import { getWheatherIcon } from "../utils/helpers";
import { SearchBar } from "./SearchBar";

const StatsData = ({ titile, value, image, showDegree }) => (
  <div className="flex w-[100%] justify-between items-center mb-[40px]">
    <div className="text-[16px] font-[300] font-primary text-gray-50 mr-[12px]">
      {titile}
    </div>
    <div className="flex items-center">
      <div className="flex items-start mr-[20px]">
        <div className="text-[16px] font-primary text-white pr-[5px]">
          {value}
        </div>
        {showDegree && <div className="text-white text-[10px]">0</div>}
      </div>
      <img src={`${image}.svg`} alt="" />
    </div>
  </div>
);

export const DetailsSider = ({ data }) => {
  const { setLocation } = useContext(AppContext);
  return (
    <div className="lg:h-[100%] lg:w-[40%] w-[100%] h-[50%] absolute bottom-0 lg:right-0 bg-blur pl-[30px] pr-[100px] pt-[30px]">
      <div className="flex items-center justify-between">
        <SearchBar />
        <img
          src="location-icon.svg"
          alt=""
          height={25}
          width={25}
          className="cursor-pointer"
          onClick={() => {
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
          }}
        />
      </div>
      <div className="text-[20px] font-primary text-white py-[30px] lg:text-start text-center">
        Weather Details...
      </div>
      <div className="text-[16px] font-primary text-white uppercase">
        {data?.condition?.text}
      </div>
      <div className="mt-[30px]">
        <StatsData
          titile={"Temp max"}
          value={data?.maxtemp_c}
          image={"max-temperature-icon"}
          showDegree={true}
        />
        <StatsData
          titile={"Temp min"}
          value={data?.mintemp_c}
          image={"min-temperature-icon"}
          showDegree={true}
        />
        <StatsData
          titile={"Humadity"}
          value={`${data?.humidity}%`}
          image={"humadity-icon"}
        />
        <StatsData
          titile={"Cloudy"}
          value={`${data?.cloud}%`}
          image={"cloudy-icon"}
        />
        <StatsData
          titile={"Wind"}
          value={`${data?.maxwind_kph} km/hr`}
          image={"wind-icon"}
        />
      </div>
      <div className="flex justify-center items-center mt-[100px]">
        <img
          src={
            data?.is_day === 1
              ? `day/${getWheatherIcon(data?.condition?.icon ?? "")}.png`
              : `night/${getWheatherIcon(data?.condition?.icon ?? "")}.png`
          }
          height={250}
          width={250}
          alt=""
          className="flex self-center object-center"
        />
      </div>
    </div>
  );
};
