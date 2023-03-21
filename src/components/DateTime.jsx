import React, { useState, useEffect } from "react";

export const DateTime = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className="font-bold bg-red-600 text-white px-6 py-1 rounded-full">
      {date.toLocaleDateString()} {date.toLocaleTimeString()}
      {/* <p> Time : {date.toLocaleTimeString()}</p>
      <p> Date : {date.toLocaleDateString()}</p> */}
    </div>
  );
};

export default DateTime;
