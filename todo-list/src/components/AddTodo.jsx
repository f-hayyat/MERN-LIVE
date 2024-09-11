import React from "react";
import Button from "./Button";

const AddTodo = () => {
  return (
    <div className="text-center mt-5 w-full px-4">
      <input
        type="text"
        placeholder="Enter todo here..."
        className="inline-block w-full max-w-md rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
          sm:w-80 md:w-96"
      />
      <input
        type="date"
        className="ml-0 mt-2 inline-block w-full max-w-md rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 
          sm:ml-2 sm:mt-0 sm:w-56 md:w-60"
      />
      <Button buttonType={"adding"} buttonText={'Add'} />
    </div>
  );
};

export default AddTodo;
