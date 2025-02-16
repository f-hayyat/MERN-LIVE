import React from "react";
import Button from "./Button";

const TodoItem = ({ todoText, todoDate }) => {
  return (
    <div className="text-center mt-5 w-full px-4">
      <p
        className="inline-block text-start w-full max-w-md px-2 
       sm:w-80 md:w-96"
      >
        {todoText}
      </p>
      <p
        className="inline-block text-start w-full max-w-md ml-0 mt-2 px-3 
       sm:ml-2 sm:mt-0 sm:w-56 md:w-60"
      >
        {todoDate}
      </p>
      <Button buttonType={"deleting"} buttonText={"Delete"} />
    </div>
  );
};

export default TodoItem;
