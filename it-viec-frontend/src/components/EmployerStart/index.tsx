import "./EmployerStart.scss";
import { formattedDate } from "@/helpers/formattedDate";
import ButtonSearch from "@/components/ButtonSearch";
import ButtonBack from "@/components/ButtonBack";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface EmployerStartProps {
  content: ReactNode;
  type?: string;
  handleBack?: () => void;
  hideSearch?: boolean;
}

function EmployerStart({ content, type, handleBack, hideSearch }: EmployerStartProps) {
  const { i18n } = useTranslation();
  const formattedDateTime = formattedDate(i18n.language);
  return (
    <div className="employer-start">
      <div className="employer-start__left">{content}</div>
      <div className="employer-start__right">
        <div className="employer-start__right-datetime">
          {formattedDateTime}
        </div>
        <div className="employer-start__right-icon">
          {type === "search" && !hideSearch ? (
            <ButtonSearch />
          ) : type !== "search" ? (
            <ButtonBack handleBack={handleBack} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default EmployerStart;
