import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const API_KEY = process.env.REACT_APP_API_KEY

const PhotoResults = () => {
  const params = useParams()
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${API_KEY}&photo_id=${params.photoId}&format=json&nojsoncallback=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.photo)
        setIsLoading(false)
      })
      .catch((error) => console.error(error))
  }, [params.photoId])

  return !isLoading && data ? (
    <>
      <img
        src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_w.jpg`}
        alt={data.title}
        loading="lazy"
      />
      <p>Author: {data.owner.realname}</p>
      <p>Title: {data.title._content}</p>
      <p>Description: {data.description._content}</p>
    </>
  ) : (
    <p>Loading data...</p>
  )
}

export default PhotoResults
