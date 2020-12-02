import { useState, useEffect } from "react"
import styled from "styled-components"

import Layout from "../../components/Layout/Layout"

const CountryContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  background-color: var(--background-color-light);
  text-align: center;

  .name {
    font-size: 2.5rem;
    margin-bottom: 0;
  }

  .region {
    font-size: 1.2rem;
    font-weight: 300;
    margin-top: 5px;
    margin-bottom: 25px;
  }

  .data-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .label {
    font-size: 1.1rem;
    color: var(--text-color-secondary);
  }

  img {
    width: 60%;
    border-radius: 8px;
  }
`
const Details = styled.div`
  background-color: var(--background-color-light);
  box-shadow: var(--box-shadow);
  border-radius: 8px;

  .heading {
    padding: 20px;
    text-align: center;
    font-size: 1.3rem;
    font-weight: 300;
    padding-bottom: 0;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
  }

  .label {
    color: var(--text-color-secondary);
  }

  .border-countries {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 24px;
    padding: 2rem 5rem;

    .border-country {
      text-align: center;
      margin: 10px;
    }

    img {
      width: 100%;
      border-radius: 8px;
      height: 80%;
    }
  }
`

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
  const country = await res.json()

  return country
}

const Country = ({ country }) => {
  const [borders, setBorders] = useState([])

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    )

    setBorders(borders)
  }

  useEffect(() => {
    getBorders()
  }, [])

  return (
    <Layout title={country.name}>
      <CountryContainer>
        <div className="overview-panel">
          <img src={country.flag} alt={country.name} />
          <h1 className="name">{country.name}</h1>
          <div className="region">{country.region}</div>
          <div className="data-container">
            <div className="population">
              <div className="value">{country.population}</div>
              <div className="label">population</div>
            </div>
            <div className="area">
              <div className="value">{country.area}</div>
              <div className="label">Area</div>
            </div>
          </div>
        </div>
      </CountryContainer>
      <Details>
        <h4 className="heading">Details</h4>
        <div className="detail-row">
          <div className="label">Capital</div>
          <div className="value">{country.capital}</div>
        </div>
        <div className="detail-row">
          <div className="label">Subregion</div>
          <div className="value">{country.subregion}</div>
        </div>
        <div className="detail-row">
          <div className="label">Languages</div>
          <div className="value">
            {country.languages.map(({ name }) => name).join(", ")}
          </div>
        </div>
        <div className="detail-row">
          <div className="label">Currencies</div>
          <div className="value">
            {country.currencies.map(({ name }) => name).join(", ")}
          </div>
        </div>
        <div className="detail-row">
          <div className="label">Native Name</div>
          <div className="value">{country.nativeName}</div>
        </div>
        <div className="detail-row">
          <div className="label">Gini</div>
          <div className="value">{country.gini}%</div>
        </div>
        <div className="border-countries">
          {borders.map(({ flag, name }) => (
            <div className="border-country">
              <img src={flag} alt={name} />
              <div className="border-name">{name}</div>
            </div>
          ))}
        </div>
      </Details>
    </Layout>
  )
}

export default Country

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id)

  return {
    props: { country },
  }
}
