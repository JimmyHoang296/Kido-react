import React from "react";

export default function CashInput({ cashList, cashs, setCashs }) {
  const handleChange = (e) => {
    const value = e.target.value;
    if (isNaN(value)) {
      return;
    }
    setCashs((prev) => ({ ...prev, [e.target.name]: value }));
  };

  return (
    <div className="input-group cash-list">
      <h2>Tiền thu trong ca</h2>
      {cashList.map((item) => (
        <div key={item.id} className="cash-input">
          <label> {item.name}</label>
          <input
            name={item.id}
            value={cashs[item.id]}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
}
