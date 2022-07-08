import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAsyncSearch } from '../../features/movies/movieSlice'
import SearchCard from '../SearchCard/SearchCard'



const Search = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAsyncSearch())
  }, [dispatch])
  return (
    <div>
      <div className='banner-img'></div>
      <SearchCard />
    </div>
  )
}

export default Search