import React from "react";
import "./Messages.scss";
import { CiChat1 } from "react-icons/ci";
import avatar from "../../assets/images/avatar.webp"
function Messages() {
  return (
    <div className="msg">
      <div className="msg__head">
        <div className="msg__title">Messages</div>
        <div className="msg__icon">
          <CiChat1 />
        </div>
      </div>
      <div className="msg__items">
        <div className="msg__item">
          <div className="msg__avatar">
            <img src={avatar} alt="" />
          </div>
          <div className="msg__body-item">
            <div className="msg__name">Carol Ferdina</div>
            <div className="msg__text">
              Have you planned for any deadline....
            </div>
          </div>
        </div>
        <div className="msg__item">
          <div className="msg__avatar">
            <img src={avatar} alt="" />
          </div>
          <div className="msg__body-item">
            <div className="msg__name">Carol Ferdina</div>
            <div className="msg__text">
              Have you planned for any deadline fasdkjfaslkdjj;l
              Have you planned for any deadline fasdkjfaslkdjj;l
              Have you planned for any deadline fasdkjfaslkdjj;l
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
