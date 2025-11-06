import React from 'react'
import "./ButtonAction.scss"
function ButtonAction({text,icon, handle}) {
  return (
    <button  className="button-action" onClick={handle}>
      {icon} <span> {text} </span>
    </button>
  )
}

export default ButtonAction