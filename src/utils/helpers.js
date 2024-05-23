export const getWheatherIcon = (iconText) => {
  if (iconText) {
    const splitedValue = iconText?.split?.("/");
    return splitedValue?.[splitedValue?.length - 1]?.split?.(".")?.[0];
  } else return "";
};
