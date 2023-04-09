import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
import SingleContent from '../../components/singleContent/SingleContent'
import "./series.css"
import Pagination from '../../components/pagination/CustomPagination'
import Genres from '../../components/Genres'
import useGenres from '../../CustomHooks/useGenres'

const Series = () => {
  const[content, setContent] = useState([]);
  const[page, setPage] = useState(1);
  const[numpages, setnumPages] = useState();
  const[genre, setGenre] = useState([]);
  const[selectedGenre, setselectedGenre] = useState([]);
  const genreURL = useGenres(selectedGenre)

  const fetchTrending = async () =>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`)
    
    setContent(data.results);
    setnumPages(data.total_pages);
  };
  useEffect(()=>{
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  },[page, genreURL])
  return (
    <div className='trend'>
      <span className='titlee'>TV Series...</span>
      <Genres
        type="tv"
        selectedGenre = {selectedGenre}
        setselectedGenre = {setselectedGenre}
        genre = {genre}
        setGenre = {setGenre}
        setPage = {setPage}
      />
      <div className="trending">
        {
          content && content.map((c) => <SingleContent
            key={c.id}
            id={c.id}
            title = {c.title || c.name}
            poster = {c.poster_path}
            media_type = "tv"
            vote = {c.vote_average}
            date = {c.release_date || c.first_air_date}
          />)
        }
      </div>
      {numpages > 1 &&
        <Pagination setPage={setPage} numPages={numpages}/>
      }
    </div>
  )
}

export default Series
