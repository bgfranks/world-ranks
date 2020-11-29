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
  }

  .name-button {
    text-align: left;
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

const CountriesTable = ({ countries }) => {
  return (
    <div>
      <CountriesHeading>
        <button className="name-button">
          <div>Name</div>
        </button>
        <button className="population-button">
          <div>Population</div>
        </button>
      </CountriesHeading>
      {countries.map((country) => (
        <CountryContainer key={country.name}>
          <div className="country-name">{country.name}</div>
          <div className="country-population">{country.population}</div>
        </CountryContainer>
      ))}
    </div>
  )
}

export default CountriesTable
