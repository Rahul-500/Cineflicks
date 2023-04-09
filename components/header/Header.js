import React from 'react'
import "./header.css"

const Header = () => {
  return (
    <section className='header'>
        <div onClick={()=> window.scroll(0,0)} class="content">
            <h2>Cineflicks</h2>
            <h2>Cineflicks</h2>
        </div>
    </section>
  )
}

export default Header
