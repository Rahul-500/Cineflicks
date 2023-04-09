import { TextField, ThemeProvider, createMuiTheme, Button, Tabs, Tab } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./search.css"
import SingleContent from '../../components/singleContent/SingleContent'
import Pagination from '../../components/pagination/CustomPagination'

const Search = () => {

  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState("");
  const[numpages, setnumPages] = useState();

  const darkTheme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#000000",
      },
    },
  });

  const fetchSearch = async()=>{
      const {data} = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
      setContent(data.results)
      setnumPages(data.total_pages)
  }

  useEffect(()=>{
    window.scroll(0,0)
    fetchSearch()
    // eslint-disable-next-line
  },[page, type])

  return (
    <div className='searching'>
      <ThemeProvider theme={darkTheme}>
        <div style={{display: "flex" , margin: "15px 0"}}>
          <TextField
            style={{flex: 1, color: "white"}}
            className= "searchBox"
            label= "Search"
            variant='filled'
            onChange={(e)=> setSearchText(e.target.value)}
          />
          <Button variant='contained' style={{marginLeft: 10}} onClick={fetchSearch}><SearchIcon/></Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="secondary"
          textColor='secondary'
          onChange={(event, newValue)=>{
            setType(newValue);
            setPage(1);
          }}
        >
          <Tab style={{width: "50%"}} label="Search Movies"/>
          <Tab style={{width: "50%"}} label="Search TV Series"/>
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {
          content && content.map((c) => <SingleContent
            key={c.id}
            id={c.id}
            title = {c.title || c.name}
            poster = {c.poster_path}
            media_type = {type ? "tv" : "movie"}
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

export default Search
