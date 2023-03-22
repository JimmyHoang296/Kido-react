import React, { useState } from "react";
import Select from "./Select";

function Expense({ expenseList, expenseValue, handleChange }) {
  const [expense, setExpense] = useState(expenseValue);
  const [items, setItems] = useState(
    expenseList
      .filter((item) => item.group === expenseValue.group)
      .map((item) => item.name)
  );
  let groups = expenseList.map((item) => item.group);
  groups = groups.filter((item, index) => groups.indexOf(item) === index);

  function handleSelectGroup(event) {
    let group = event.target.value;
    let updatedExpense = { ...expense, group: group, name: "", unit: "" };
    setItems(
      expenseList
        .filter((item) => item.group === group)
        .map((item) => item.name)
    );
    setExpense(updatedExpense);
    handleChange(updatedExpense);
  }

  function handleSelectItem(event) {
    let exName = event.target.value;

    let exUnit = expenseList.find((ex) => ex.name === exName).unit;
    let updatedExpense = { ...expense, name: exName, unit: exUnit };
    setExpense(updatedExpense);
    handleChange(updatedExpense);
  }

  const handleChangeInput = (event) => {
    let inputName = event.target.name;
    let value = event.target.value;
    let newTotal = expense.total;
    if (isNaN(value) && inputName !== "note" && inputName !== "source") {
      return;
    }
    if (inputName === "price") {
      newTotal = value * expense.qty;
    }
    if (inputName === "qty") {
      newTotal = value * expense.price;
    }
    let updatedExpense = { ...expense, [inputName]: value, total: newTotal };
    setExpense(updatedExpense);
    handleChange(updatedExpense);
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="expense" key={expense.id} id={expense.id}>
      <Select
        name="Nhóm chi phí"
        items={groups}
        selectedItem={expense.group}
        onSelectItem={handleSelectGroup}
      />
      <Select
        name="Chi phí"
        items={items}
        selectedItem={expense.name}
        onSelectItem={handleSelectItem}
      />
      <input
        type="text"
        name="unit"
        value={expense.unit}
        placeholder="Đơn vị tính"
        disabled
      />
      <input
        type="text"
        name="price"
        value={expense.price}
        placeholder="đơn giá"
        onChange={handleChangeInput}
      />
      <input
        type="text"
        name="qty"
        value={expense.qty}
        placeholder="số lượng"
        onChange={handleChangeInput}
      />
      <input
        type="text"
        name="total"
        value={numberWithCommas(expense.total)}
        placeholder="tổng"
        disabled
      />
      <select name="source" value={expense.source} onChange={handleChangeInput}>
        <option value="cash">tiền mặt</option>
        <option value="bank">chuyển khoản</option>
      </select>
      <input
        type="text"
        name="note"
        value={expense.note}
        placeholder="ghi chú"
        onChange={handleChangeInput}
      />
    </div>
  );
}

export default Expense;
