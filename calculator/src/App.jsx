import { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";
function App() {
  const [input, setInput] = useState("");

  const handleClick = (e) => {
    const value = e.target.value;

    if (value === "C") {
      setInput("");
    } else if (value === "=") {
      try {
        const result = evaluate(input);
        setInput(result.toString());
      } catch (err) {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };
  return (
    <div className="calculator">
      <div className="display">{input}</div>
      <div className="buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
          <button key={num} value={num} onClick={handleClick}>
            {num}
          </button>
        ))}
        <button value="C" onClick={handleClick}>
          C
        </button>
        <button value="+" onClick={handleClick}>
          +
        </button>
        <button value="-" onClick={handleClick}>
          -
        </button>
        <button value="*" onClick={handleClick}>
          *
        </button>
        <button value="/" onClick={handleClick}>
          /
        </button>
        <button value="=" onClick={handleClick}>
          =
        </button>
      </div>
    </div>
  );
}

export default App;
