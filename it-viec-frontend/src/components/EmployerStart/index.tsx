import "./EmployerStart.scss";
import { formattedDate } from "@/helpers/formattedDate";
import ButtonSearch from "@/components/ButtonSearch";
import ButtonBack from "@/components/ButtonBack";
import type { ReactNode } from "react";

interface EmployerStartProps {
  content: ReactNode;
  type?: string;
  handleBack?: () => void;
}

function EmployerStart({ content, type, handleBack }: EmployerStartProps) {
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
