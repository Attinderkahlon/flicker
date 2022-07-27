import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'

const SearchResults = () => {
  const params = useParams()
  const [data, setData] = useState([])

  useEffect(() => {
    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7969583c40cc661ae7154305e0a487c2&text=${params.queryText}&format=json&nojsoncallback=1`
    )
      .then((res) => res.json())
      .then((data) => setData(data.photos.photo))
      .catch((error) => console.error(error))
  }, [params.queryText])

  return (
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
                onClick={() =>
                  console.log(`navigate to details page of ${item.id}`)
                }
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default SearchResults
