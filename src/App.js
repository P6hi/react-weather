import './App.css';
import { useState, useEffect } from 'react';

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const getCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all', {mode: 'cors'})
    const countryList = await response.json()
    return countryList
  }

  useEffect(() => {
    getCountries().then(res => {
      setCountries(res)
    })
  }, [])

  const searchCountries = (search === '') ? '' : countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
    <div>Search for country: <input onChange={(e) => setSearch(e.target.value)}/></div>
    <DisplayCountries searchedCountries={searchCountries} />
    </div>
  )
}

const DisplayCountries = ({searchedCountries}) => {
  if (searchedCountries.length > 0 && searchedCountries.length < 10) {
    return searchedCountries.map(country => <div key={country.ccn3}>{country.name.official} {country.flag}</div>)
  }
}

export default App;
