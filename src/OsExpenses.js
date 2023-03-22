import React from "react";
import Expense from "./Expense";

function DrExpenses({ expenseList, shift, expenses, setExpenses }) {
  const addExpense = () => {
    if (expenses.length > 0 && expenses[expenses.length - 1].group === "") {
      return;
    }

    let newID =
      expenses.length < 9
        ? "o0" + (expenses.length + 1)
        : "o" + expenses.length;
    newID = shift + newID;

    let newEx = {
      id: newID,
      group: "",
      name: "",
      unit: "",
      price: "",
      qty: "",
      source: "bank",
      total: "",
      note: ""
    };
    setExpenses((prev) => [...prev, newEx]);
  };

  const handleChange = (expense) => {
    let updatedExpenses = expenses.map((ex) => {
      if (ex.id === expense.id) {
        return expense;
      }
      return ex;
    });
    setExpenses(updatedExpenses);
  };
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="input-group expense-list">
      <h2>Chi ngoài ca </h2>
      <h3>
        Tiền mặt{" "}
        {numberWithCommas(
          expenses.reduce(
            (a, v) => (v.source === "cash" ? a + v.total * 1 : a),
            0
          )
        )}
        đ
      </h3>
      <h3>
        Tiền ngân hàng{" "}
        {numberWithCommas(
          expenses.reduce(
            (a, v) => (v.source === "bank" ? a + v.total * 1 : a),
            0
          )
        )}
        đ
      </h3>
      <button onClick={addExpense}>Thêm chi phí</button>
      {expenses && expenses.length > 0
        ? expenses.map((ex, index) => (
            <Expense
              key={index}
              expenseList={expenseList}
              expenseValue={ex}
              handleChange={handleChange}
            />
          ))
        : ""}
    </div>
  );
}

export default DrExpenses;
