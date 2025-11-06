import React from 'react'
import "./ButtonUpload.scss"
import { FiUpload } from "react-icons/fi";
function ButtonUpload({text, handleUpload}) {
  return (
    <div className='button-upload' onClick={handleUpload}>
      <FiUpload />
      <span>{text}</span>
    </div>
  )
}

export default ButtonUpload