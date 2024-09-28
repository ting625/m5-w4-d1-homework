import { useState, useEffect } from 'react';
import './App.css';
import countries from 'i18n-iso-countries';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureLow, faTemperatureHigh, faMapMarketAlt } from "@fortawesome/free-solid-svg-icons";

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State
  const [apiData, setApiData] = useState ({});
  const [getState, setGetState] = useState ('Irvine, USA');
  const [state, setState] = useState('Irvine, USA');

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  //Side effect
  useEffect(() => {
    fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setGetState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return ((k - 273.15) * 1.8 +32). toFixed(0);
  };

  return (
  <div className="App">
    <header className="d-flex justify-content align-items-center">
       <h2>React Weather App</h2>
    </header>

    <div className="card mt-3 mx-auto">
      { /* Is it true data coming in from open weather based on input location */}
      {apiData.main
      ? (<div class="card-body text-center">
        <img
          src={`http://openweather.org/img/w/${apiData.weather[0].icon}.png`}
        
        />

      </div>) /* Load data if true */
      : (<h1>Loading...</h1>)} {/*Outout message if false */} 
    </div>

    <footer className="footer">
      &copy; React Weather App
    </footer>
  </div>
  );
}

export default App;
