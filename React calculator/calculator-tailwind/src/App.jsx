import React from "react";
import Button from "./Components/Button";
import Input from "./Components/Input";

const App = () => {
  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
      <div className="p-6 text-center">
        <Input />
        <Button />
      </div>
    </div>
  );
};

export default App;
