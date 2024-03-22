import React from "react";

const sizes = {
  xs: "text-xl font-normal leading-7",
  lg: "text-5xl font-normal leading-[66px] md:text-[44px] sm:text-[38px]",
  s: "text-2xl font-normal leading-8 md:text-[22px]",
  md: "text-[32px] font-normal leading-[52px] md:text-3xl sm:text-[28px]",
};

const Text = ({ children, className = "", as, size = "s", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-white-A700 font-opensans ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
