import axios from "axios";
import { useEffect, useState } from "react";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const baseUrl = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setCountries(response.data);
    });
  }, []);

  if (!countries) {
    return null;
  }
  const found = countries.filter((c) =>
    c.name.common.toLowerCase().includes(country.toLowerCase())
  );

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <>
      <form>
        find countries
        <input value={country} onChange={handleChange} />
      </form>
      {found.length === 1 ? (
        <Country country={found[0]} />
      ) : found.length >= 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        found.map((c) => (
          <div key={c.name.common}>
            {c.name.common}{" "}
            <button onClick={() => setCountry(c.name.common)}>show</button>
          </div>
        ))
      )}
    </>
  );
};
export default App;
