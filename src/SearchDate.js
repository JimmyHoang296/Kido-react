import React, { useState } from "react";

const getToday = () => {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDate();
  var dateString =
    year +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day;
  return dateString;
};

function getTextDate(date) {
  var year = date.slice(2, 4);
  var month = date.slice(5, 7);
  var day = date.slice(8, 10);
  return `${day}${month}${year}`;
}

const SearchDate = ({ onSearch }) => {
  const [day, setDay] = useState(getToday());
  const [shift, setShift] = useState("c1");
  const [dayShift, setDayShift] = useState(getTextDate(day) + shift);

  const handleDayChange = (event) => {
    let value = event.target.value;
    setDay(value);
    setDayShift(getTextDate(value) + shift);
  };

  const handleShiftChange = (event) => {
    let value = event.target.value;
    setShift(value);
    setDayShift(getTextDate(day) + value);
  };

  return (
    <div>
      <input type="date" value={day} onChange={handleDayChange} />
      <select id="shift" value={shift} name="ca" onChange={handleShiftChange}>
        <option value="c1" selected>
          Ca 1
        </option>
        <option value="c2">Ca 2</option>
      </select>
      <button
        onClick={() => {
          onSearch(dayShift);
        }}
      >
        {" "}
        Search{" "}
      </button>
    </div>
  );
};

export default SearchDate;
