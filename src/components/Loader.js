import { LoadingOutlined } from "@ant-design/icons";
import classNames from "classnames";
import React from "react";

export const Loader = ({ children, loading }) => {
  return (
    <div
      className={classNames(
        "h-[100vh] w-[100vw]",
        loading && "bg-gray-500 opacity-70 z-[9999]"
      )}
    >
      {loading && (
        <LoadingOutlined
          className="text-[100px] text-white w-[100%] fixed top-[40%]"
          color="white"
        />
      )}
      {children}
    </div>
  );
};
