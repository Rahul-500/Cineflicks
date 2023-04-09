import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import BottomNav from './components/BottomNav';
import Header from './components/header/Header';
import { Container } from '@material-ui/core';
import Movies from "./pages/movies/Movies"
import Trending from "./pages/trending/Trending"
import Search from "./pages/search/Search"
import Series from "./pages/series/Series"

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="app">
        <Container>
          <Routes>
            <Route exact path='/' element={<Trending/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/series' element={<Series/>}/>
            <Route path='/movies' element={<Movies/>}/>
          </Routes>
        </Container>
      </div>
      <BottomNav/>
    </BrowserRouter>
  );
}

export default App;
