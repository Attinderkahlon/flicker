import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'

const API_KEY = process.env.REACT_APP_API_KEY

const SearchResults = () => {
  const params = useParams()
  let navigate = useNavigate()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${params.queryText}&format=json&nojsoncallback=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.photos.photo)
        setIsLoading(false)
      })
      .catch((error) => console.error(error))
  }, [params.queryText])

  return !isLoading && data ? (
    <ImageList sx={{ width: '100%', height: '80vh', margin: '10px auto 0' }}>
      {data.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
                onClick={() => navigate(`/photo/${item.id}`)}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  ) : (
    <p>Loading data...</p>
  )
}

export default SearchResults
