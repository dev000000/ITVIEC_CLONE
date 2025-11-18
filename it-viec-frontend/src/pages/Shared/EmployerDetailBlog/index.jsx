import React from 'react'
import "./EmployerDetailBlog.scss"
import image from "../../../assets/images/everything-empty.svg"
function EmployerDetailBlog() {
  return (
    <div className='employer-detail-blog'>
      <div className='employer-box employer-box--empty'>
        <div className='employer-box__image' ><img src={image} alt="No posts"  /></div>
        <div className='employer-box__content'>
          <p>Không có bài viết nào</p>
        </div>
      </div>
    </div>
  )
}

export default EmployerDetailBlog