import React, { useEffect, useState } from "react";
import "./MenuItem.scss";
import { NavLink } from "react-router-dom";
function MenuItem({ props }) {
  return (
    <li className="menu-item" data-title={props.name} >
      <NavLink
        to={props.link}
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <span className="menu-item__icon">{props.icon}</span>
        <span className="menu-item__title">{props.name}</span>
      </NavLink>
    </li>
  );
}

export default MenuItem;
