import React from "react";

const Button = () => {
  const btnNames = [
    "/",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "C",
  ];
  return btnNames.map((name) => (
    <button
      type="button"
      key={name}
      className="m-3 max-w-12  px-5 py-2.5 rounded-lg text-lg tracking-wider font-medium border border-blue-700 outline-none bg-transparent hover:bg-blue-700 text-blue-700 hover:text-white transition-all duration-300"
    >
      {name}
    </button>
  ));
};

export default Button;
