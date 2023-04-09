import { Chip } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect } from 'react'

const Genres = ({
    type,
    selectedGenre,
    setselectedGenre,
    genre,
    setGenre,
    setPage
}) => {

    const handleAdd = (g)=> {
        setselectedGenre([...selectedGenre, g])
        setGenre(genre.filter((gg)=> gg.id !== g.id))
        setPage(1)
    }
    const handleDelete = (g)=> {
        setGenre([...genre, g])
        setselectedGenre(selectedGenre.filter((gg)=> gg.id !== g.id))
        setPage(1)
    }
    
    const fetchGenre = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setGenre(data.genres);
    }

    useEffect(()=>{
        fetchGenre();
        // eslint-disable-next-line
    },[])

  return (
    <div style={{padding: "6px 0"}}>
      {selectedGenre.map((g)=>(
        <Chip
            style={{margin: 2}}
            label= {g.name}
            key = {g.id}
            color = {"primary"}
            clickable
            size = "small"
            onDelete={()=> handleDelete(g)}
        />
      ))}
      {genre.map((g)=>(
        <Chip
            style={{margin: 2}}
            label= {g.name}
            key = {g.id}
            color = {"secondary"}
            clickable
            size = "small"
            onClick={()=> handleAdd(g)}
        />
      ))}
    </div>
  )
}

export default Genres
