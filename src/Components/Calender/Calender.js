import React, { useState, useRef, useEffect } from "react";

import "./Calender.css";

function Calender() {
  const week = [
    {
      index: 0,
      day: "Sun",
    },
    {
      index: 1,
      day: "Mon",
    },
    {
      index: 2,
      day: "Tue",
    },
    {
      index: 3,
      day: "Wed",
    },
    {
      index: 4,
      day: "Thu",
    },
    {
      index: 5,
      day: "Fri",
    },
    {
      index: 6,
      day: "Sat",
    },
  ];
  const monthsArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const yearRef = useRef();
  const [isYearInputvisible, setIsYearInputvisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateDesc, setDateDesc] = useState({
    date: "",
    day: "",
    month: "",
    year: "",
    daysInMonth: "",
    activeDate: "",
  });

  const handleDobleClickOnYear = () => {
    setIsYearInputvisible(true);
  };

  const previousYearHandler = () => {
    const myDateDesc = { ...dateDesc };
    myDateDesc.year -= 1;
    setDateDesc(myDateDesc);
    const date = new Date(myDateDesc.year, dateDesc.month, dateDesc.date);
    setDate(date);
  };
  const previousMonthHandler = () => {
    const myDateDesc = { ...dateDesc };
    if (myDateDesc.month === 0) {
      myDateDesc.month = 11;
      myDateDesc.year -= 1;
    } else {
      myDateDesc.month -= 1;
    }
    setDateDesc(myDateDesc);
    const date = new Date(myDateDesc.year, myDateDesc.month, dateDesc.date);
    setDate(date);
  };
  const nextYearHandler = () => {
    const myDateDesc = { ...dateDesc };
    myDateDesc.year += 1;
    setDateDesc(myDateDesc);
    const date = new Date(myDateDesc.year, dateDesc.month, dateDesc.date);
    setDate(date);
  };
  const nextMonthHandler = () => {
    const myDateDesc = { ...dateDesc };
    if (myDateDesc.month === 11) {
      myDateDesc.month = 0;
      myDateDesc.year += 1;
    } else {
      myDateDesc.month += 1;
    }
    setDateDesc(myDateDesc);
    const date = new Date(myDateDesc.year, myDateDesc.month, dateDesc.date);
    setDate(date);
  };

  const calculateDaysInMonth = (month, year) => {
    month = parseInt(month);
    if (month === undefined || !year) return 0;
    month += 1;
    if (month === 2) {
      const yearRegExp =
        /^(181[2-9]|18[2-9]\d|19\d\d|2\d{3}|30[0-3]\d|304[0-8])$/; // range 1812-3048
      if (year.length > 4 && isNaN(year)) return 0;
      if (!yearRegExp.test(year)) return 0;
      if (year % 4 === 0) return 29;
      else return 28;
    } else {
      if (month > 7) {
        if (month % 2 === 0) return 31;
        else return 30;
      } else {
        if (month % 2 === 0) return 30;
        else return 31;
      }
    }
  };

  const generateBody = () => {
    const firstDay = dateDesc.day;
    const noOfDays = dateDesc.daysInMonth;
    const d = new Date();
    let onCurrentMonth = true;
    if (d.getMonth() === dateDesc.month && d.getFullYear() === dateDesc.year) {
      onCurrentMonth = true;
    } else {
      onCurrentMonth = false;
    }

    let startDate = 1;
    const output = [];
    for (let i = 0; i < 6; ++i) {
      let currRow = [];
      if (startDate <= noOfDays) {
        for (let j = 0; j < 7; ++j) {
          if (i === 0) {
            if (j >= firstDay) {
              currRow.push(
                <div
                  id={`${
                    onCurrentMonth && startDate === dateDesc.activeDate
                      ? "today"
                      : `${j}`
                  }`}
                  className="col"
                  key={"" + i + j + Math.random()}
                >
                  {startDate}
                </div>
              );
              startDate += 1;
            } else
              currRow.push(
                <div
                  className="col"
                  id={`col-${j}`}
                  key={"" + i + j + Math.random()}
                />
              );
          } else {
            if (startDate <= noOfDays) {
              currRow.push(
                <div
                  className="col"
                  id={`${
                    onCurrentMonth && startDate === dateDesc.activeDate
                      ? "today"
                      : `${j}`
                  }`}
                  key={"" + i + j + Math.random()}
                >
                  {startDate}
                </div>
              );
            } else {
              currRow.push(
                <div
                  className="col"
                  id={`col-${j}`}
                  key={"" + i + j + Math.random()}
                />
              );
            }
            startDate += 1;
          }
        }
      }

      output.push(
        <div className={`row row-${i}`} key={Date.now() + Math.random()}>
          {currRow}
        </div>
      );
    }
    return output;
  };

  useEffect(() => {
    if (!date) return;
    const myDate = new Date(date);
    const firstDayOfMonth = new Date(
      myDate.getFullYear(),
      myDate.getMonth(),
      1
    );
    const tempDateDesc = { ...dateDesc };
    tempDateDesc.day = firstDayOfMonth.getDay();
    tempDateDesc.date = myDate.getDate();
    tempDateDesc.month = myDate.getMonth();
    tempDateDesc.year = myDate.getFullYear();
    tempDateDesc.daysInMonth = calculateDaysInMonth(
      myDate.getMonth(),
      myDate.getFullYear()
    );
    tempDateDesc.activeDate = myDate.getDate();
    setDateDesc(tempDateDesc);
  }, [date]);

  return (
    <div className="calender">
      <h1 id="heading">Calender</h1>
      <div className="top-section">
        <select
          value={dateDesc.month}
          onChange={(e) =>
            setDate(
              new Date(
                dateDesc.year,
                parseInt(e.target.value),
                dateDesc.activeDate
              )
            )
          }
        >
          {monthsArr.map((item, i) => (
            <option key={i} value={i}>
              {item}
            </option>
          ))}
        </select>
        {isYearInputvisible ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDate(
                new Date(
                  parseInt(yearRef.current.value),
                  dateDesc.month,
                  dateDesc.date
                )
              );
              setIsYearInputvisible(false);
            }}
          >
            <input type="text" id="year-text-box" ref={yearRef} />
          </form>
        ) : (
          <span id="year" onDoubleClick={handleDobleClickOnYear}>
            {dateDesc.year}
          </span>
        )}
      </div>

      <div className="main-body">
        <div className="row">
          {week.map((day, i) => (
            <div className="col header-columns" key={i}>
              {day.day}
            </div>
          ))}
        </div>
        {generateBody()}
      </div>
      <div className="control-section">
        <button id="previous-year" onClick={previousYearHandler}>{`<<`}</button>
        <button
          id="previous-month"
          onClick={previousMonthHandler}
        >{`<`}</button>
        <button id="next-month" onClick={nextMonthHandler}>{`>`}</button>
        <button id="next-year" onClick={nextYearHandler}>{`>>`}</button>
      </div>
    </div>
  );
}

export default Calender;
