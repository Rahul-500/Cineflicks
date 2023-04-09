import React from 'react'
import { img_300, unavailable } from '../../config/config'
import "./singleContent.css"
import { Badge } from '@material-ui/core'
import ContentModal from '../ContentModal/ContentModal'

const SingleContent = ({id, title, poster, media_type, vote, date }) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge badgeContent={vote.toFixed(1)} color={vote > 6 ? "secondary" : "primary"}/>
      <img className='poster' src={poster ?`${img_300}/${poster}` : unavailable} alt={title} />
      <b className='title'>{title}</b>
      <span className='subTitle'>{media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  )
}

export default SingleContent
