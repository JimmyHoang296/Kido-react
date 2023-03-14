import React from "react";

function SelectInput({ name, items, selectedItem, onSelectItem }) {
  return (
    <select value={selectedItem} onChange={onSelectItem}>
      <option value="" disabled hidden>
        {name}
      </option>
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default SelectInput;
