import Layout from "../components/Layout/Layout"
import SearchInput from "../components/SearchInput"

import styled from "styled-components"
import CountriesTable from "../components/CountriesTable"

const Count = styled.div`
  margin: 12px 0;
  color: var(--text-color-secondary);
`

export default function Home({ countries }) {
  return (
    <Layout>
      <Count>Found {countries.length} countries</Count>
      <SearchInput placeholder="Search by Name, Region, or SubRegion" />
      <CountriesTable countries={countries} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all")
  const countries = await res.json()

  return {
    props: {
      countries,
    },
  }
}
