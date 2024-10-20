import React, { useReducer, useRef } from "react";

const initialState = 0;
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "DOUBLE":
      return state * 2;
    case "RESET":
      return initialState;
    case "CHANGE_BY_INPUT":
      return state + action.payload.num;
  }
};
const App = () => {
  const [count, dispatch] = useReducer(reducer, initialState);
  const inputNumber = useRef();

  const handleIncrement = () => {
    dispatch({ type: "INCREMENT" });
  };
  const handleDecrement = () => {
    dispatch({ type: "DECREMENT" });
  };
  const handleDouble = () => {
    dispatch({ type: "DOUBLE" });
  };

  const handleChangeByInput = () => {
    const num = inputNumber.current.value;
    inputNumber.current.value = "";

    dispatch({
      type: "CHANGE_BY_INPUT",
      payload: { num },
    });
  };

  return (
    <div>
      <h1>Counter</h1>
      <h3>Count: {count}</h3>
      <button onClick={handleIncrement}>Increment</button>
      <br />
      <br />
      <button onClick={handleDecrement}>Decrement</button>
      <br />
      <br />
      <button onClick={handleDouble}>Double</button>
      <br />
      <br />
      <button onClick={() => dispatch("RESET")}>Reset</button>
      <br />
      <br />
      <input
        type="number"
        id="input"
        placeholder="Enter a number"
        ref={inputNumber}
      />
      <button htmlFor="input" onClick={handleChangeByInput}>
        Change by input
      </button>
    </div>
  );
};

export default App;
