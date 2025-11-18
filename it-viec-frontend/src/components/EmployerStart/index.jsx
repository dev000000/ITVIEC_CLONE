import React from "react";
import "./EmployerStart.scss";
import { formattedDate } from "../../helpers/formattedDate";
import ButtonSearch from "../ButtonSearch";
import ButtonBack from "../ButtonBack";
function EmployerStart({ content, type, handleBack }) {
  const formattedDateTime = formattedDate();
  return (
    <div className="employer-start">
      <div className="employer-start__left">{content}</div>
      <div className="employer-start__right">
        <div className="employer-start__right-datetime">
          {formattedDateTime}
        </div>
        <div className="employer-start__right-icon">
          {type === "search" ? (
            <ButtonSearch />
          ) : (
            <ButtonBack handleBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployerStart;
