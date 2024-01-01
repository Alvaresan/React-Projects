import "./App.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [statements, setStatements] = useState([]);

  const [input, setInput] = useState({
    statement: "",
    amount: "",
    type: "income",
  });

  const [showError, setShowError] = useState({
    statement: false,
    amount: false,
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = statements.reduce((sum, { amount, type }) => {
      if (type === "income") {
        return sum + parseFloat(amount);
      } else {
        return sum - parseFloat(amount);
      }
    }, 0);
    setTotal(newTotal);
  }, [statements]);

  const renderTotal = () => {
    if (total < 0) {
      return (
        <h1 className="total-text">
          Total: <span style={{ color: "red" }}>{total.toFixed(2)}</span>
        </h1>
      );
    } else {
      return (
        <h1 className="total-text">
          Total: <span style={{ color: "green" }}>{total.toFixed(2)}</span>
        </h1>
      );
    }
  };

  const handleUpdateInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAddNewStatement = () => {
    const { statement, amount, type } = input;

    if (!statement) {
      return setShowError({
        statement: true,
        amount: false,
      });
    } else if (!amount) {
      return setShowError({
        statement: false,
        amount: true,
      });
    } else {
      setShowError({
        statement: false,
        amount: false,
      });
      setStatements([
        ...statements,
        {
          id: uuidv4(),
          name: statement,
          amount: parseFloat(amount).toFixed(2),
          type: type,
          date: new Date().toLocaleDateString(),
        },
      ]);
      setInput({
        statement: "",
        amount: "",
        type: "income",
      });
    }
  };

  return (
    <main>
      <div>
        <h1 className="total-text">{renderTotal()}</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Income or expense"
            onChange={handleUpdateInput}
            value={input.statement}
            name="statement"
            style={{ borderColor: showError.statement ? "red" : "black" }}
          />
          <input
            placeholder="Amount"
            type="number"
            onChange={handleUpdateInput}
            value={input.amount}
            name="amount"
            style={{ borderColor: showError.amount ? "red" : "black" }}
          />
          <select value={input.type} onChange={handleUpdateInput} name="type">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button onClick={handleAddNewStatement}>+</button>
        </div>
        <div>
          {statements.map(({ name, amount, type, date, id }) => (
            <div className="card" key={id}>
              <div className="card-info">
                <h4>{name}</h4>
                <p>{date}</p>
              </div>
              <p
                className={`amount-text ${
                  type === "income" ? "success" : "danger"
                }`}
              >
                {type === "income" ? "+" : "-"}${amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
