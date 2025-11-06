import React from 'react'
import "./Card.scss"
function Card({children, style}) {
  return (
    <div className='card-item' style={style}>
      {children}
    </div>
  )
}

export default Card