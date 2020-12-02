import Link from "next/Link"
import { useState } from "react"
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons"
import styled from "styled-components"

const CountriesHeading = styled.div`
  display: flex;

  button {
    border: none;
    background: transparent;
  }

  .name-button,
  .population-button {
    flex: 1;
    padding: 20px;
    color: var(--text-color-secondary);
    font-weight: 500;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .name-button {
    justify-content: flex-start;
  }

  .heading-arrow {
    color: var(--primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
  }
`

const CountryContainer = styled.div`
  display: flex;
  padding: 20px;
  text-align: center;
  background-color: var(--background-color-light);
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: var(--box-shadow);
  font-weight: 500;
  transition: transform 200ms ease-in-out, box-shadow 200ms ease-in-out;

  :hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  }

  .country-name,
  .country-population {
    flex: 1;
  }

  .country-name {
    text-align: left;
  }
`

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1))
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1))
  }

  return countries
}

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>
  }

  if (direction === "asc") {
    return (
      <div className="heading-arrow">
        <KeyboardArrowDownRounded />
      </div>
    )
  } else {
    return (
      <div className="heading-arrow">
        <KeyboardArrowUpRounded />
      </div>
    )
  }
}

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState()
  const [value, setValue] = useState()

  const orderedCountries = orderBy(countries, value, direction)

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc")
    } else if (direction === "desc") {
      setDirection("asc")
    } else {
      setDirection(null)
    }
  }

  const setValueAndDirection = (value) => {
    switchDirection()
    setValue(value)
  }

  return (
    <div>
      <CountriesHeading>
        <button
          className="name-button"
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          {value === "name" && <SortArrow direction={direction} />}
        </button>
        <button
          className="population-button"
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>
      </CountriesHeading>
      {orderedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`}>
          <CountryContainer key={country.name}>
            <div className="country-name">{country.name}</div>
            <div className="country-population">{country.population}</div>
          </CountryContainer>
        </Link>
      ))}
    </div>
  )
}

export default CountriesTable
