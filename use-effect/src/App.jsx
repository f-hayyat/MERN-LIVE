import { useEffect, useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const btnClicked = () => {
    setCounter(counter + 1);
  };
  useEffect(() => {
    // Runs after the component has been rendered
    console.log("Component rendered");
  }, [] ); 
  useEffect(() => {
    // Runs after the component has been updated
    console.log("Component updated");
  }, [counter]); // Only runs when the counter changes

  return (
    <>
      <div>{counter}</div>
      <button onClick={btnClicked}>Click me</button>
    </>
  );
}

export default App;
