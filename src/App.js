import axios from 'axios';
import { useState } from 'react';

import './App.css';

function App() {
  const [data , setData] = useState([]);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  
  const searchLocation = (event) =>{
     if(event.key === "Enter"){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d37694a2c631262056af6d36874c8fe8`).then((res) =>{
          setData(res.data)
          console.log(res.data);
       }
      )
      setLat("");
      setLon("")
     }
  }
  return (
    <div className="app">
     
      <div className='input_divs'>
      <div className="search">
        <input
        value={lat}
        onChange={event =>setLat(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter Latitude"
         type="text" />
      </div>
      <div className="search">
        <input
        value={lon}
        onChange={event =>setLon(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter Longitude"
         type="text" />
      </div>
      </div>
      
    <div className="container">
      <div className="top">
        <p>{data.name}</p>
      </div>
      <div className="temp">
       { data.main ? <h1>{Math.floor(data.main.temp -273.15)}°C</h1> : null}
      </div>
      <div className="description">
       {data.weather ? <p>{data.weather[0].main}</p> : null}
      </div>
      <div className="bottom">
        <div className="feels">
          {data.main ? <p className='bold'>{Math.floor(data.main.feels_like -273.15)}°C</p> : null}
          <p>Feels Like</p>
        </div>
        <div className="humidity">
        {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
          <p>Humidity</p>
        </div>
        <div className="wind">
         {data.wind ? <p className='bold'>{data.wind.speed} MPH</p>: null} 
         <p>Wind Speed</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
