import { useState } from "react";
import "./styles.css";
import React from "react";
import SearchDate from "./SearchDate";
import Modal from "./Modal";
import DrExpenses from "./DrExpenses";
import OsExpenses from "./OsExpenses";

function App() {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isMainDisplay, setIsMainDisplay] = useState(false);
  const [shift, setShift] = useState("");

  const [drExpenses, setDrExpenses] = useState([]);
  const [osExpenses, setOsExpenses] = useState([]);
  const [drList, setDrList] = useState([]);
  const [osList, setOsList] = useState([]);
  const URL =
    "https://script.google.com/macros/s/AKfycbwr34Xy9OOF7UxZVDxSTNlSrTGVKvmOauX1h02qzkhLtVn7QqwEEDbslwar7gBq1rUiVg/exec";

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting
    // Get all form data as an object
    const submitData = {
      type: "update",
      id: shift,
      // sale: [{}],
      dr: drExpenses,
      os: osExpenses
      // cash: [{}]
    };
    console.log(JSON.stringify(submitData));
    setIsDisplay(true);
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(submitData) // body data type must match "Content-Type" header
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        handleResponse(data);
        alert("Đã cập nhật thành công");
        setIsDisplay(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Cập nhật không thành công, hãy thử lại");
        setIsDisplay(false);
      });
  };

  const handleResponse = (data) => {
    console.log("handleresponse", data);
    setDrList(data.setUp.expenseList.filter((ex) => ex.type === "Trong ca"));
    setOsList(data.setUp.expenseList.filter((ex) => ex.type === "Ngoài ca"));
    setDrExpenses(
      !data.dayData.dayExpense.length
        ? []
        : data.dayData.dayExpense.filter((ex) => ex.type === "Trong ca")
    );
    setOsExpenses(
      !data.dayData.dayExpense.length
        ? []
        : data.dayData.dayExpense.filter((ex) => ex.type === "Ngoài ca")
    );
  };

  const handleSearch = (dayShift) => {
    setShift(dayShift);
    setDrExpenses([]);
    setOsExpenses([]);
    var submitData = {
      type: "search",
      id: dayShift
    };
    console.log(JSON.stringify(submitData));

    setIsDisplay(true);
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(submitData) // body data type must match "Content-Type" header
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        handleResponse(data);
        setIsDisplay(false);
        setIsMainDisplay(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Cập nhật không thành công, hãy thử lại");
        setIsDisplay(false);
      });
  };

  const getToday = () => {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var dateString =
      (day < 10 ? "0" : "") +
      day +
      (month < 10 ? "0" : "") +
      month +
      year.toString().slice(2, 4);

    return dateString;
  };

  return (
    <div className="App">
      <SearchDate
        onSearch={handleSearch}
        dayShift={shift}
        setDayShift={setShift}
      />
      {isMainDisplay && (
        <>
          <h2>
            Nhập chi phí ngày
            {` ${shift.slice(0, 2)}/${shift.slice(2, 4)}/20${shift.slice(
              4,
              6
            )}`}
          </h2>
          <DrExpenses
            expenseList={drList}
            shift={shift}
            expenses={drExpenses}
            setExpenses={setDrExpenses}
          />

          <OsExpenses
            expenseList={osList}
            shift={shift}
            expenses={osExpenses}
            setExpenses={setOsExpenses}
          />
          {getToday() === shift.slice(0, 6) && (
            <button onClick={handleSubmit}> Submit</button>
          )}
        </>
      )}
      {isDisplay ? <Modal /> : ""}
    </div>
  );
}

export default App;

