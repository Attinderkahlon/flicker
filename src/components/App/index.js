import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'

import SearchPage from '../SearchPage'
import SearchResults from '../SearchResults'
import PhotoResults from '../PhotoResults'

const App = () => {
  let navigate = useNavigate()
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${query}`)
  }

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
      <Routes>
        <Route
          path="/"
          element={
            <SearchPage
              handleSubmit={handleSubmit}
              queryValue={query}
              onQueryChange={(e) => setQuery(e.target.value)}
              isSubmitDisabled={!query}
            />
          }
        >
          <Route index element={<p>Enter a search to begin.</p>} />
          <Route path="/search/:queryText" element={<SearchResults />} />
        </Route>
        <Route path="/photo/:photoId" element={<PhotoResults />} />
      </Routes>
    </Container>
  )
}

export default App
