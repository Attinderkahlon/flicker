import { Outlet } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import Stack from '@mui/material/Stack'

const SearchPage = ({
  handleSubmit,
  queryValue,
  onQueryChange,
  isSubmitDisabled,
}) => {
  return (
    <>
      <h1>Flickr Search</h1>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <TextField
            id="search-field"
            size="small"
            label="Search"
            variant="outlined"
            value={queryValue}
            onChange={onQueryChange}
          />
          <Button
            disabled={isSubmitDisabled}
            type="submit"
            variant="contained"
            size="large"
          >
            Search
          </Button>
        </Stack>
      </form>
      <Outlet />
    </>
  )
}

export default SearchPage
