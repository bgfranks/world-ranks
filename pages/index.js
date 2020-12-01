import { useState } from "react"

import Layout from "../components/Layout/Layout"
import SearchInput from "../components/SearchInput"

import styled from "styled-components"
import CountriesTable from "../components/CountriesTable"

const Count = styled.div`
  margin: 12px 0;
  color: var(--text-color-secondary);
`

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState("")

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  )

  const onInputChange = (e) => {
    e.preventDefault()

    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <Layout>
      <Count>Found {countries.length} countries</Count>
      <SearchInput
        placeholder="Search by Name, Region, or SubRegion"
        onChange={onInputChange}
      />
      <CountriesTable countries={filteredCountries} />
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
