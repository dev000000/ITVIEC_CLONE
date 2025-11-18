import "./Cascader.scss";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoMdThermometer,
} from "react-icons/io";
import { Col, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cascader({ menuItems, type }) {
  const [activeChild, setActiveChild] = useState(null);
  const navigate = useNavigate();
  const handleNavigate = (link) => {
    if (link) {
      navigate(link);
    }
  };
  return (
    <div
      className="cascader"
      onMouseEnter={() => setActiveChild(menuItems.items[0].id)}
      onClick={() => handleNavigate(menuItems.link)}
    >
      <span className="cascader__head">{menuItems.header}</span>
      <IoIosArrowDown className="cascader__arrow" />
      <div
        className="cascader__dropdown"
        onMouseEnter={() => setActiveChild(activeChild)}
        onMouseLeave={() => setActiveChild(null)}
        style={{ width: type === "small" ? "500px" : "893px" }}
      >
        <div className="cascader__dropdown-content">
          <div className="cascader__dropdown-left">
            <ul className="cascader__dropdown-child1">
              {menuItems.items.map((item) => (
                <li
                  key={item.id}
                  className={
                    "cascader__dropdown-item-child1" +
                    (activeChild === item.id ? " active" : "")
                  }
                  onMouseEnter={() => setActiveChild(item.id)}
                >
                  <a href={item.link}>
                    <span>{item.label}</span> <IoIosArrowForward />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="cascader__dropdown-right">
            {menuItems.items.map((item) => (
              <div
                key={item.id}
                className={`cascader__dropdown-child2 ${
                  activeChild === item.id ? "active" : ""
                }`}
              >
                <Row>
                  {item.child.map((child) => (
                    <Col
                      span={24 / item.type}
                      key={item.id + "-" + child.id}
                      className="cascader__dropdown-item-child2"
                    >
                      <a href={child.link}>{child.label}</a>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
            {menuItems.items.map((item) => (
              <div
                key={item.id + "-viewmore"}
                className={`cascader__dropdown-viewmore ${
                  activeChild === item.id && item.viewmore.active
                    ? "active"
                    : ""
                }`}
              >
                {item.viewmore.active && (
                  <a href={item.viewmore.link}>
                    <span>Xem thêm</span> <IoIosArrowForward />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cascader;
