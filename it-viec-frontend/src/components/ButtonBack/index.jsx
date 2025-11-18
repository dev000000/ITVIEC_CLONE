import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import "./ButtonBack.scss"
function ButtonBack({handleBack}) {
  return (
    <div className='button-back' onClick={handleBack}>
      <IoIosArrowBack />
    </div>
  )
}

export default ButtonBack