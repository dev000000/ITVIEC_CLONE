import React from 'react'
import "./Activity.scss"
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
function Activity() {
  return (
    <div className="activity">
          <div className="activity__head">
            <div className="activity__title">Activity</div>
            <div className="activity__icon">
              <IoMdNotificationsOutline />
            </div>
          </div>
          <div className="activity__items">
            <div className="activity__item">
              <div className="activity__logo">
                <MdErrorOutline />
              </div>
              <div className="activity__body-item">
                <div className="activity__notify">Your plan expired in 3 days.</div>
                <div className="activity__action">
                  Renew now
                </div>
              </div>
            </div>
            <div className="activity__item">
              <div className="activity__logo">
                <MdErrorOutline />
              </div>
              <div className="activity__body-item">
                <div className="activity__notify">Your plan expired in 3 days.</div>
                <div className="activity__action">
                  Renew now
                </div>
              </div>
            </div>
            <div className="activity__item">
              <div className="activity__logo">
                <MdErrorOutline />
              </div>
              <div className="activity__body-item">
                <div className="activity__notify">Your plan expired in 3 days.</div>
                <div className="activity__action">
                  Renew now
                </div>
              </div>
            </div>
            <div className="activity__item">
              <div className="activity__logo">
                <MdErrorOutline />
              </div>
              <div className="activity__body-item">
                <div className="activity__notify">Your plan expired in 3 days.</div>
                <div className="activity__action">
                  Renew now
                </div>
              </div>
            </div>
            <div className="activity__item">
              <div className="activity__logo">
                <MdErrorOutline />
              </div>
              <div className="activity__body-item">
                <div className="activity__notify">Your plan expired in 3 days.</div>
                <div className="activity__action">
                  Renew now
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Activity