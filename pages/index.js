import Layout from "../components/Layout/Layout"
import styled from "styled-components"

export default function Home({ countries }) {
  console.log(countries)
  return (
    <Layout>
      <div>Found {countries.length} countries</div>
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
