import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
import SingleContent from '../../components/singleContent/SingleContent'
import "./trending.css"
import Pagination from '../../components/pagination/CustomPagination'

const Trending = () => {
  const[content, setContent] = useState([]);
  const[page, setPage] = useState(1);
  const fetchTrending = async () =>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
    setContent(data.results);
  };
  useEffect(()=>{
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  },[page])
  return (
    <div className='trend'>
      <span className='titlee'>Trending...</span>
      <div className="trending">
        {
          content && content.map((c) => <SingleContent
            key={c.id}
            id={c.id}
            title = {c.title || c.name}
            poster = {c.poster_path}
            media_type = {c.media_type}
            vote = {c.vote_average}
            date = {c.release_date || c.first_air_date}
          />)
        }
      </div>
      <Pagination setPage={setPage}/>
    </div>
  )
}

export default Trending