import React from "react";

const Button = ({ buttonType, buttonText, buttonHandler }) => {
  if (buttonType === "adding")
    return (
      <button
        onClick={buttonHandler}
        className="bg-green-600 px-4 py-2 rounded-md ml-2 w-28 "
      >
        {buttonText}
      </button>
    );
  else if (buttonType === "deleting") {
    return (
      <button
        onClick={buttonHandler}
        className="bg-red-600 px-4 py-2 rounded-md ml-2 w-28"
      >
        {buttonText}
      </button>
    );
  } else {
    return (
      <button
        onClick={buttonHandler}
        className="bg-blue-600 px-4 py-2 rounded-md ml-2 w-28"
      >
        Save
      </button>
    );
  }
};

export default Button;
