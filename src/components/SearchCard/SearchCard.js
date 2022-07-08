import React from 'react'
import Slider from 'react-slick'
import { Settings } from '../../common/settings'
import { useSelector } from 'react-redux/es/exports'
import {getAllSearch } from '../../features/movies/movieSlice'
import MovieCard from '../MovieCard/MovieCard'
import './SearchCard.scss'
const SearchCard = () => {
    const searchs = useSelector(getAllSearch)

    let renderSearch = ""

    renderSearch = 
    searchs.Response === "True" ? (
      searchs.Search.map((search, index) => (
        <MovieCard key={index} data={search} />
      ))
    ) : (
      <div className="shows-error">
        <h3>{searchs.Error}</h3>
      </div>
    );
  return (
    <div className="search-wrapper">
      <div className='search-list'>
        <h2>Search</h2>
        <div className='search-container'>
            {renderSearch}
        </div>
      </div>
    </div>
  )
}

export default SearchCard