import React from "react";

export const BgImage = () => {
  return (
    <img
      src={"bg-image.webp"}
      alt=""
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        zIndex: -10,
        objectFit: "cover",
      }}
      height={"100vh"}
    />
  );
};
