import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  const [temperature, setTemperature] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");

  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setTemperature(response.data.main.temp);
        setIcon(
          `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
        setDescription(response.data.weather[0].description);
        setWind(response.data.wind.speed);
      });
  }, [api_key, country.capital]);

  return (
    <>
      <div key={country.name}>
        <h1>{country.name.common}</h1>
        {country.capital.length === 1 ? (
          <div>capital {country.capital}</div>
        ) : (
          <div>
            capitals
            <ul>
              {country.capital.map((capital) => (
                <li key={capital}> {capital}</li>
              ))}
            </ul>
          </div>
        )}

        <div>area {country.area}</div>
        <br></br>
        <b>languages:</b>
        <ul>
          {Object.values(country.languages).map((lan) => (
            <li key={lan}> {lan}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} width={150} />
        <h2>
          Weather in{" "}
          {country.capital.length === 1 ? country.capital : country.capital[0]}
        </h2>
        <div>temperature {temperature} Celsius</div>
        <img src={icon} alt={description}></img>
        <div>wind {wind} m/s</div>
      </div>
    </>
  );
};
export default Country;
