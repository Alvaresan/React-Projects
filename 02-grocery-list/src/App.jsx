/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */

import "./App.css";
import groceryCartImg from "./assets/grocery-cart.png";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");

  const [groceryItems, setGroceryItems] = useState([]);

  const [isCompleted, setIsCompleted] = useState(false);

  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const determineCompletedStatus = useCallback(() => {
    if (!groceryItems.length > 0) {
      setIsCompleted(false);
    }
    let isAllCompleted = true;

    groceryItems.forEach((item) => {
      if (!item.completed) {
        isAllCompleted = false;
      }
    });
    setIsCompleted(isAllCompleted);
  }, [groceryItems, setIsCompleted]);

  useEffect(() => {
    determineCompletedStatus();
  }, [groceryItems, determineCompletedStatus]);

  const handleAddGroceryItem = () => {
    if (inputValue) {
      const updatedGroceryList = [...groceryItems];
      const itemIndex = updatedGroceryList.findIndex(
        (item) => item.name === inputValue
      );
      if (itemIndex === -1) {
        updatedGroceryList.push({
          name: inputValue,
          quantity: 1,
          completed: false,
        });
      } else {
        updatedGroceryList[itemIndex].quantity += 1;
      }
      setGroceryItems(updatedGroceryList);
      setInputValue("");
    }
  };

  const handleRemoveItem = (name) => {
    setGroceryItems([...groceryItems].filter((item) => item.name !== name));
  };

  const handleUpdateCompleteStatus = (status, index) => {
    const updatedGroceryList = [...groceryItems];
    updatedGroceryList[index].completed = status;
    setGroceryItems(updatedGroceryList);
  };

  const renderGroceryItems = () => {
    return groceryItems.map((item, index) => (
      <li key={item.name}>
        <div className="container">
          <input
            type="checkbox"
            onChange={(e) =>
              handleUpdateCompleteStatus(e.target.checked, index)
            }
            checked={item.completed}
            value={item.name}
          />
          <p>
            {item.name}{" "}
            {item.quantity > 1 ? <span>x{item.quantity}</span> : null}
          </p>
        </div>
        <div>
          <button
            className="remove"
            onClick={() => handleRemoveItem(item.name)}
          >
            X
          </button>
        </div>
      </li>
    ));
  };

  return (
    <main className="App">
      <div>
        <div>
          {isCompleted && <h4 className="success">You're done</h4>}
          <div className="header">
            <h1>Shopping List</h1>
            <img src={groceryCartImg} alt="grocery-cart" />
            <input
              type="text"
              placeholder="Enter item..."
              className="item-input"
              onChange={handleChangeInputValue}
              value={inputValue}
              onKeyDown={(e) => e.key === "Enter" && handleAddGroceryItem()}
            />
          </div>
        </div>
        <ul>{renderGroceryItems()}</ul>
      </div>
    </main>
  );
}

export default App;
