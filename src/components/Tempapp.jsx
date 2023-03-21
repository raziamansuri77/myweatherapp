import React, { useState } from "react";
import "./css/style.css";
import { FiSearch } from "react-icons/fi";
import { ImLocation } from "react-icons/im";
import DateTime from "./DateTime";

export default function Tempapp() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState(0);
  const [mintemp, setMinTemp] = useState(0);
  const [maxtemp, setMaxTemp] = useState(0);

  return (
    <div className="flex justify-center pt-[100px] w-full h-screen bg-blue-200">
      <div className="bg-[#0666B2] w-[500px] h-[400px] flex flex-col justify-center items-center  ">
        <div className="flex">
          <div className=" relative">
            <input
              type="search"
              className="outline-none pl-[25px]"
              placeholder="      Enter a City......."
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <div
              className="absolute top-1 left-1
          "
            >
              <ImLocation />
            </div>
          </div>
          <div className="lat"></div>
          <div className="lon"></div>
          <button
            className="bg-white px-2"
            onClick={async () => {
              const cityName = search;
              const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=eec306174a9aa77c07d195171dc0df52`;
              const result = await fetch(url);
              const data = await result.json();
              const lat = data[0].lat;
              const lon = data[0].lon;
              // setLat(lat);
              // setLon(lon);
              // ==================weather API======================
              const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eec306174a9aa77c07d195171dc0df52`;
              const result2 = await fetch(url2);
              const data2 = await result2.json();
              const weather = data2.weather[0].description;
              setWeather(weather);
              const temp = data2.main.temp;
              setTemp(temp - 273.15);
              const mintemp = data2.main.temp_min;
              setMinTemp(mintemp - 273.15);
              const maxtemp = data2.main.temp_max;
              setMaxTemp(maxtemp - 273.15);
            }}
          >
            <FiSearch />
          </button>
        </div>

        <div className="flex items-center text-white justify-center p-4 pl-8 ">
          <div className="">
            <h1 className="text-[30px]">{temp.toFixed(2)} °C</h1>

            <h3 className="tempmin_max">
              Min:{mintemp.toFixed(2)} °C | Max:{maxtemp.toFixed(2)} °C
            </h3>
          </div>
          <img
            className="h-[150px] w-[150px]"
            alt=""
            src="https://img.icons8.com/fluency/48/null/chance-of-storm.png"
          />
          <div className="weather text-[30px]">{weather}</div>
        </div>
        <div className="text-white">
          <DateTime />
        </div>
      </div>
    </div>
  );
}
