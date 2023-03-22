import { useState } from "react";
import "./styles.css";
import React from "react";
import SearchDate from "./SearchDate";
import Modal from "./Modal";
import DrExpenses from "./DrExpenses";
import OsExpenses from "./OsExpenses";
import CashInput from "./CashInput";

function App() {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isMainDisplay, setIsMainDisplay] = useState(false);
  const [shift, setShift] = useState("");
  const cashList = [
    { id: "cashStart", name: "Tiền đầu ca" },
    { id: "cashSale", name: "Doanh thu bán hàng" },
    { id: "grab", name: "Doanh thu Grab" },
    { id: "baemin", name: "Doanh thu Baemin" },
    { id: "shopee", name: "Doanh thu Shopee" },
    { id: "cashBank", name: "Tiền ngân hàng" },
    { id: "cashEnd", name: "Tiền cuối ca" }
  ];

  const [drExpenses, setDrExpenses] = useState([]);
  const [osExpenses, setOsExpenses] = useState([]);
  const [drList, setDrList] = useState([]);
  const [osList, setOsList] = useState([]);
  const [cashs, setCashs] = useState(
    cashList.reduce((a, v) => ({ ...a, [v.id]: "" }), {})
  );

  const URL =
    "https://script.google.com/macros/s/AKfycbzeBrZpPEv7qVJgbp30s0czVfrFYeVNro-pWWaJr-oxVRQ46lhCBfGv9FtFklVpsJDu/exec";

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting
    // Get all form data as an object
    const submitData = {
      type: "update",
      id: shift,
      // sale: [{}],
      dr: drExpenses,
      os: osExpenses,
      cash: cashs
    };
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
    setCashs(cashList.reduce((a, v) => ({ ...a, [v.id]: "" }), {}));
    var submitData = {
      type: "search",
      id: dayShift
    };
    // console.log(JSON.stringify(submitData));

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
            Nhập chi phí {shift.slice(6, 8) === "c1" ? "ca 1" : "ca 2"} ngày
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
          <CashInput cashList={cashList} cashs={cashs} setCashs={setCashs} />
          {getToday() === shift.slice(0, 6) && (
            <button onClick={handleSubmit}> Submit</button>
          )}
        </>
      )}
      {isDisplay ?? <Modal />}
    </div>
  );
}

export default App;
