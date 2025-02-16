import React from "react";

const Input = () => {
  return (
    <div className="flex justify-center w-full">
      <input
        type="text"
        className="m-4 w-4/5 block border-2  rounded-md p-2 text-sm text-gray-700  border-blue-500"
        readOnly
      />
    </div>
  );
};

export default Input;
