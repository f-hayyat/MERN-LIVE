import React from "react";
import { useState } from "react";
function App() {
  const [color, setColor] = useState("olive");
  return (
    <>
      <div className="w-full h-screen" style={{ backgroundColor: color }}>
        <div className=" flex flex-wrap justify-center fixed bottom-5 inset-x-0">
          <div className="bg-white rounded-2xl px-2 py-2 gap-3 flex flex-wrap justify-center">
            <button style={{backgroundColor:"red"}} onClick={()=>setColor("red")} className="text-white outline-none  shadow-lg px-1 py-1 rounded-2xl min-w-16">
              Red
            </button>
            <button style={{backgroundColor:"green"}} onClick={()=>setColor("green")} className="text-white outline-none  shadow-lg px-1 py-1 rounded-2xl">
              Green
            </button>
            <button style={{backgroundColor:"yellow"}} onClick={()=>setColor("yellow")} className="text-white outline-none  shadow-lg px-1 py-1 rounded-2xl">
              Yellow
            </button>
            <button style={{backgroundColor:"blue"}} onClick={()=>setColor("blue")} className="text-white outline-none  shadow-lg px-1 py-1 rounded-2xl">
              Blue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
