import moment from "moment";
import React from "react";
import { getWheatherIcon } from "../utils/helpers";

export const TempDetails = ({ temperatureData }) => {
  return (
    <div className="absolute lg:top-[70%] top-[20%] left-[10%] md:left-[20%] lg:left-32">
      <div className="flex items-center">
        <div className="flex items-start pr-[20px]">
          <div className="text-[70px] font-primary text-white pr-[5px]">
            {temperatureData?.temp_c}
          </div>
          <div className="text-white text-[20px] pt-[15px]">0</div>
        </div>
        <div className="pr-[20px]">
          <div className="text-[30px] font-primary text-white">
            {temperatureData?.name}
          </div>
          <div className="text-[16px] font-primary text-white">
            {moment(temperatureData?.last_updated).format(
              "hh:mm a - dddd, D MMM 'YY"
            )}
          </div>
        </div>
        <img
          src={
            temperatureData?.is_day === 1
              ? `day/${getWheatherIcon(
                  temperatureData?.condition?.icon ?? ""
                )}.png`
              : `night/${getWheatherIcon(
                  temperatureData?.condition?.icon ?? ""
                )}.png`
          }
          alt=""
        />
      </div>
    </div>
  );
};
