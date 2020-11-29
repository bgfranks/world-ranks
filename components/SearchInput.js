import SearchRounded from "@material-ui/icons/SearchRounded"
import styled from "styled-components"

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--background-color-dark);
  border-radius: 8px;
  padding-left: 16px;
  color: var(--text-color-secondary);

  .input {
    border: none;
    background-color: transparent;
    padding: 16px;
    width: 100%;
    height: 100%;
    outline: none;

    ::placeholder {
      color: var(--text-color-secondary);
    }
  }
`

const SearchInput = ({ ...rest }) => {
  return (
    <SearchContainer>
      <SearchRounded />
      <input className="input" {...rest} />
    </SearchContainer>
  )
}

export default SearchInput
