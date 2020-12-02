import styled from "styled-components"

import Layout from "../../components/Layout/Layout"

const Country = ({ country }) => {
  return (
    <Layout title={country.name}>
      <div>
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
      </div>
    </Layout>
  )
}

export default Country

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${params.id}`)
  const country = await res.json()

  return {
    props: { country },
  }
}
