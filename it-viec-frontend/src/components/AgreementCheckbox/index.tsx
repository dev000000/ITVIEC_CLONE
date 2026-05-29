import { FaCheck } from "react-icons/fa6";
import "./AgreementCheckbox.scss";
import { useTranslation } from "react-i18next";

interface AgreementCheckBoxProps {
  id: string;
  onHandleChange: React.ChangeEventHandler<HTMLInputElement>;
  text?: React.ReactNode;
}

function AgreementCheckBox({ id, onHandleChange, text }: AgreementCheckBoxProps) {
  const { t } = useTranslation("employer");
  return (
    <>
      <div className="agreement__checkbox">
        <input
          type="checkbox"
          id={id}
          className="agreement__checkbox-input"
          onChange={onHandleChange}
        />
        <label className="agreement__checkbox-label" htmlFor={id}>
          <FaCheck className="agreement__checkbox-icon" />
          {text ? (<div className="agreement__checkbox-content--custom">{text}</div>) : (<span className="agreement__checkbox-content">
            {t("agreement.readAndAgree")}{" "}
            <a href="/terms-conditions-vn" target="_blank" rel="noopener noreferrer">
              {t("agreement.termsLink")}
            </a>{" "}
            {t("agreement.and")}{" "}
            <a href="/quy-dinh-bao-mat" target="_blank" rel="noopener noreferrer">
              {t("agreement.privacyLink")}
            </a>{" "}
            {t("agreement.ofSite")}
          </span>)}


        </label>
      </div>
    </>
  );
}
export default AgreementCheckBox;
