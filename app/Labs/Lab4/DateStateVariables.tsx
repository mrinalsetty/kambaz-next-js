"use client";
import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";

export default function DateStateVariable() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const dateObjectToHtmlDateString = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    setStartDate(new Date());
  }, []);

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>
      {startDate && (
        <>
          <h3>{JSON.stringify(startDate)}</h3>
          <h3>{dateObjectToHtmlDateString(startDate)}</h3>
          <FormControl
            type="date"
            defaultValue={dateObjectToHtmlDateString(startDate)}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </>
      )}
      <hr />
    </div>
  );
}
