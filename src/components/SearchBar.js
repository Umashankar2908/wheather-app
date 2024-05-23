import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "..";
import { BASE_URL, key } from "../utils/constants";

export const SearchBar = () => {
  const [data, setData] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [queryText, setQueryText] = useState();
  const { setLocation } = useContext(AppContext);
  useEffect(() => {
    queryText &&
      axios({
        method: "get",
        url: `${BASE_URL}search.json`,
        params: { key, q: queryText },
      })
        .then((res) => {
          setData(res?.data ?? []);
          res?.data?.length > 0 && setOpenDropdown(true);
        })
        .catch((err) => console.log(err));
  }, [queryText]);

  return (
    <div className="border-b-[1px] w-[80%] flex justify-between px-[10px] relative">
      <input
        className="outline-none bg-transparent py-[12px] font-primary text-white text-[18px] w-[100%]"
        placeholder="Search Location..."
        onChange={(e) => setQueryText(e.target.value)}
        value={queryText}
      />
      <img src="search_icon.svg" alt="" />
      {openDropdown && (
        <>
          <div
            className="h-[100vh] w-[100vw] fixed z-20"
            onClick={() => setOpenDropdown(false)}
          ></div>
          <div className="w-[100%] absolute top-16 bg-white left-0 font-primary text-[16px] px-[10px] shadow-sm rounded-[10px] z-50">
            {data?.map((item) => (
              <div
                key={item?.id}
                className="py-[10px] border-b-[1px] cursor-pointer"
                onClick={() => {
                  setQueryText("");
                  setLocation(item);
                  setOpenDropdown(false);
                }}
              >{`${item?.name} ${
                item?.region ? `(${item?.region})` : ""
              } `}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
