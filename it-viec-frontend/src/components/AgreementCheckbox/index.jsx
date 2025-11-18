import { FaCheck } from "react-icons/fa6";
import "./AgreementCheckbox.scss"
function AgreementCheckBox({id, onHandleChange, text}) {
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
            Tôi đã đọc và đồng ý với các{" "}
            <a
              href="/terms-conditions-vn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Điều khoản dịch vụ
            </a>{" "}
            và{" "}
            <a
              href="/quy-dinh-bao-mat"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chính sách quyền riêng tư
            </a>{" "}
            của NHIEUviec liên quan đến thông tin riêng tư của tôi.
          </span>)}
          
          
        </label>
      </div>
    </>
  );
}
export default AgreementCheckBox;
