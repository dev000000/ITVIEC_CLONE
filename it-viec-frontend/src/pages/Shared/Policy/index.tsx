import { useTranslation } from "react-i18next";

// 1.3 Trang chính sách bảo mật
function Policy() {
  console.log("1.3.Policy component rendered");
  const { t } = useTranslation("shared");
  return (
    <>
      <div className="test">{t("policy.title")}</div>
    </>
  );
}
export default Policy;