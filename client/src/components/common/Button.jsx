import React from "react";

const Button = ({ onClick, icon = null, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center bg-secondary hover:bg-white border border-secondary hover:text-secondary text-white px-4 py-2 rounded-md gap-1 duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
