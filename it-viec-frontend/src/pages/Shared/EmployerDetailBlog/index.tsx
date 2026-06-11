import "./EmployerDetailBlog.scss";
import image from "@/assets/images/everything-empty.svg";
import { useTranslation } from "react-i18next";

// 1.5.2 Tab bài viết của nhà tuyển dụng
const EmployerDetailBlog = () => {
  const { t } = useTranslation("shared");
  return (
    <div className='employer-detail-blog'>
      <div className='employer-box employer-box--empty'>
        <div className='employer-box__image' ><img src={image} alt="No posts" /></div>
        <div className='employer-box__content'>
          <p>{t("employerDetailBlog.noPosts")}</p>
        </div>
      </div>
    </div>
  )
}

export default EmployerDetailBlog