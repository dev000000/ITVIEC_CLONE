import { useTranslation } from "react-i18next";

// 1.2 Trang điều khoản sử dụng 
function Term() {
  console.log("1.2.Term component rendered");
  const { t } = useTranslation("shared");
  return (
    <>
      <div className="test">{t("term.title")}</div>
    </>
  );
}
export default Term;