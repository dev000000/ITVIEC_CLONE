import "./SwiperFeedback.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
function SwiperFeedback() {
  return (
    <>
      <Swiper
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        // loop ={true}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        // #TODO: slideperview : so slide hien thi tren man hinh
        slidesPerGroup={1}
        // #TODO: slideperGroup : so slide se truot khi click next

        breakpoints={{
          768: {
            slidesPerView: 1,
            spaceBetween: 50,
            slidesPerGroup: 1,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
            slidesPerGroup: 2,
          },
        }}
        pagination={{ el: ".swiper-feedbacks__pagination", type: "fraction" }}
        navigation={{
          nextEl: ".swiper-feedbacks__nav-right",
          prevEl: ".swiper-feedbacks__nav-left",
        }}
      >
        <SwiperSlide>
          <div className="swiper-feedbacks__itemSw">
            <p className="swiper-feedbacks__itemSw-content">
              1.Chúng tôi đã tuyển dụng được nhiều ứng viên đủ tiêu chuẩn thông
              qua các tin đăng tuyển dụng trên ITviec. ITviec cực kỳ chuyên
              nghiệp, hữu ích và thân thiện trong việc thu hút nhân tài trong
              lĩnh vực IT. Thật tuyệt vời khi được làm việc cùng đội ngũ chăm
              sóc khách hàng của ITviec
            </p>
            <div className="swiper-feedbacks__itemSw-author">
              <div className="swiper-feedbacks__itemSw-left">
                <h4 className="swiper-feedbacks__itemSw-name">
                  Trần Thị Lan Anh
                </h4>
                <p className="swiper-feedbacks__itemSw-role">
                  Talent Acquisition Lead | ELCA Vietnam
                </p>
              </div>
              <div className="swiper-feedbacks__itemSw-right">
                <img src="/images.webp" alt="logo_cong_ty" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-feedbacks__itemSw">
            <p className="swiper-feedbacks__itemSw-content">
              2.Chúng tôi đã tuyển dụng được nhiều ứng viên đủ tiêu chuẩn thông
              qua các tin đăng tuyển dụng trên ITviec. ITviec cực kỳ chuyên
              nghiệp, hữu ích và thân thiện trong việc thu hút nhân tài trong
              lĩnh vực IT. Thật tuyệt vời khi được làm việc cùng đội ngũ chăm
              sóc khách hàng của ITviec
            </p>
            <div className="swiper-feedbacks__itemSw-author">
              <div className="swiper-feedbacks__itemSw-left">
                <h4 className="swiper-feedbacks__itemSw-name">
                  Trần Thị Lan Anh
                </h4>
                <p className="swiper-feedbacks__itemSw-role">
                  Talent Acquisition Lead | ELCA Vietnam
                </p>
              </div>
              <div className="swiper-feedbacks__itemSw-right">
                <img src="/images.webp" alt="logo_cong_ty" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-feedbacks__itemSw">
            <p className="swiper-feedbacks__itemSw-content">
              3.Chúng tôi đã tuyển dụng được nhiều ứng viên đủ tiêu chuẩn thông
              qua các tin đăng tuyển dụng trên ITviec. ITviec cực kỳ chuyên
              nghiệp, hữu ích và thân thiện trong việc thu hút nhân tài trong
              lĩnh vực IT. Thật tuyệt vời khi được làm việc cùng đội ngũ chăm
              sóc khách hàng của ITviec
            </p>
            <div className="swiper-feedbacks__itemSw-author">
              <div className="swiper-feedbacks__itemSw-left">
                <h4 className="swiper-feedbacks__itemSw-name">
                  Trần Thị Lan Anh
                </h4>
                <p className="swiper-feedbacks__itemSw-role">
                  Talent Acquisition Lead | ELCA Vietnam
                </p>
              </div>
              <div className="swiper-feedbacks__itemSw-right">
                <img src="/images.webp" alt="logo_cong_ty" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-feedbacks__itemSw">
            <p className="swiper-feedbacks__itemSw-content">
              4.Chúng tôi đã tuyển dụng được nhiều ứng viên đủ tiêu chuẩn thông
              qua các tin đăng tuyển dụng trên ITviec. ITviec cực kỳ chuyên
              nghiệp, hữu ích và thân thiện trong việc thu hút nhân tài trong
              lĩnh vực IT. Thật tuyệt vời khi được làm việc cùng đội ngũ chăm
              sóc khách hàng của ITviec
            </p>
            <div className="swiper-feedbacks__itemSw-author">
              <div className="swiper-feedbacks__itemSw-left">
                <h4 className="swiper-feedbacks__itemSw-name">
                  Trần Thị Lan Anh
                </h4>
                <p className="swiper-feedbacks__itemSw-role">
                  Talent Acquisition Lead | ELCA Vietnam
                </p>
              </div>
              <div className="swiper-feedbacks__itemSw-right">
                <img src="/images.webp" alt="logo_cong_ty" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-feedbacks__itemSw">
            <p className="swiper-feedbacks__itemSw-content">
              5.Chúng tôi đã tuyển dụng được nhiều ứng viên đủ tiêu chuẩn thông
              qua các tin đăng tuyển dụng trên ITviec. ITviec cực kỳ chuyên
              nghiệp, hữu ích và thân thiện trong việc thu hút nhân tài trong
              lĩnh vực IT. Thật tuyệt vời khi được làm việc cùng đội ngũ chăm
              sóc khách hàng của ITviec
            </p>
            <div className="swiper-feedbacks__itemSw-author">
              <div className="swiper-feedbacks__itemSw-left">
                <h4 className="swiper-feedbacks__itemSw-name">
                  Trần Thị Lan Anh
                </h4>
                <p className="swiper-feedbacks__itemSw-role">
                  Talent Acquisition Lead | ELCA Vietnam
                </p>
              </div>
              <div className="swiper-feedbacks__itemSw-right">
                <img src="/images.webp" alt="logo_cong_ty" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-feedbacks__itemSw">
            <p className="swiper-feedbacks__itemSw-content">
              6.Chúng tôi đã tuyển dụng được nhiều ứng viên đủ tiêu chuẩn thông
              qua các tin đăng tuyển dụng trên ITviec. ITviec cực kỳ chuyên
              nghiệp, hữu ích và thân thiện trong việc thu hút nhân tài trong
              lĩnh vực IT. Thật tuyệt vời khi được làm việc cùng đội ngũ chăm
              sóc khách hàng của ITviec
            </p>
            <div className="swiper-feedbacks__itemSw-author">
              <div className="swiper-feedbacks__itemSw-left">
                <h4 className="swiper-feedbacks__itemSw-name">
                  Trần Thị Lan Anh
                </h4>
                <p className="swiper-feedbacks__itemSw-role">
                  Talent Acquisition Lead | ELCA Vietnam
                </p>
              </div>
              <div className="swiper-feedbacks__itemSw-right">
                <img src="/images.webp" alt="logo_cong_ty" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-feedbacks__itemSw">
            <p className="swiper-feedbacks__itemSw-content">
              7.Chúng tôi đã tuyển dụng được nhiều ứng viên đủ tiêu chuẩn thông
              qua các tin đăng tuyển dụng trên ITviec. ITviec cực kỳ chuyên
              nghiệp, hữu ích và thân thiện trong việc thu hút nhân tài trong
              lĩnh vực IT. Thật tuyệt vời khi được làm việc cùng đội ngũ chăm
              sóc khách hàng của ITviec
            </p>
            <div className="swiper-feedbacks__itemSw-author">
              <div className="swiper-feedbacks__itemSw-left">
                <h4 className="swiper-feedbacks__itemSw-name">
                  Trần Thị Lan Anh
                </h4>
                <p className="swiper-feedbacks__itemSw-role">
                  Talent Acquisition Lead | ELCA Vietnam
                </p>
              </div>
              <div className="swiper-feedbacks__itemSw-right">
                <img src="/images.webp" alt="logo_cong_ty" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-feedbacks__itemSw">
            <p className="swiper-feedbacks__itemSw-content">
              8.Chúng tôi đã tuyển dụng được nhiều ứng viên đủ tiêu chuẩn thông
              qua các tin đăng tuyển dụng trên ITviec. ITviec cực kỳ chuyên
              nghiệp, hữu ích và thân thiện trong việc thu hút nhân tài trong
              lĩnh vực IT. Thật tuyệt vời khi được làm việc cùng đội ngũ chăm
              sóc khách hàng của ITviec
            </p>
            <div className="swiper-feedbacks__itemSw-author">
              <div className="swiper-feedbacks__itemSw-left">
                <h4 className="swiper-feedbacks__itemSw-name">
                  Trần Thị Lan Anh
                </h4>
                <p className="swiper-feedbacks__itemSw-role">
                  Talent Acquisition Lead | ELCA Vietnam
                </p>
              </div>
              <div className="swiper-feedbacks__itemSw-right">
                <img src="/images.webp" alt="logo_cong_ty" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-feedbacks__itemSw">
            <p className="swiper-feedbacks__itemSw-content">
              9.Chúng tôi đã tuyển dụng được nhiều ứng viên đủ tiêu chuẩn thông
              qua các tin đăng tuyển dụng trên ITviec. ITviec cực kỳ chuyên
              nghiệp, hữu ích và thân thiện trong việc thu hút nhân tài trong
              lĩnh vực IT. Thật tuyệt vời khi được làm việc cùng đội ngũ chăm
              sóc khách hàng của ITviec
            </p>
            <div className="swiper-feedbacks__itemSw-author">
              <div className="swiper-feedbacks__itemSw-left">
                <h4 className="swiper-feedbacks__itemSw-name">
                  Trần Thị Lan Anh
                </h4>
                <p className="swiper-feedbacks__itemSw-role">
                  Talent Acquisition Lead | ELCA Vietnam
                </p>
              </div>
              <div className="swiper-feedbacks__itemSw-right">
                <img src="/images.webp" alt="logo_cong_ty" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-feedbacks__itemSw">
            <p className="swiper-feedbacks__itemSw-content">
              10.Chúng tôi đã tuyển dụng được nhiều ứng viên đủ tiêu chuẩn thông
              qua các tin đăng tuyển dụng trên ITviec. ITviec cực kỳ chuyên
              nghiệp, hữu ích và thân thiện trong việc thu hút nhân tài trong
              lĩnh vực IT. Thật tuyệt vời khi được làm việc cùng đội ngũ chăm
              sóc khách hàng của ITviec
            </p>
            <div className="swiper-feedbacks__itemSw-author">
              <div className="swiper-feedbacks__itemSw-left">
                <h4 className="swiper-feedbacks__itemSw-name">
                  Trần Thị Lan Anh
                </h4>
                <p className="swiper-feedbacks__itemSw-role">
                  Talent Acquisition Lead | ELCA Vietnam
                </p>
              </div>
              <div className="swiper-feedbacks__itemSw-right">
                <img src="/images.webp" alt="logo_cong_ty" />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="swiper-feedbacks__nav-pag">
        <div className="swiper-feedbacks__nav swiper-feedbacks__nav-left">
          <MdKeyboardArrowLeft />
        </div>
        <div className="swiper-feedbacks__pagination"> 5 / 5 </div>
        <div className="swiper-feedbacks__nav swiper-feedbacks__nav-right">
          <MdKeyboardArrowRight />
        </div>
      </div>
    </>
  );
}
export default SwiperFeedback;
