import React from "react";
import PropTypes from "prop-types";

const shapes = {
  round: "rounded-[23px]",
};
const variants = {
  fill: {
    gray_900: "bg-gray-900 text-orange-200",
  },
};
const sizes = {
  xs: "h-[44px] px-[35px] text-2xl",
  sm: "h-[47px] px-[35px] text-2xl",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "sm",
  color = "gray_900",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer text-orange-200 text-2xl bg-gray-900 min-w-[211px] ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["gray_900"]),
};

export { Button };
