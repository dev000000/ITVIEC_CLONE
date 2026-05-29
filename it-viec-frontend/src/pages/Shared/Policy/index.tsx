import { useTranslation } from "react-i18next";

function Policy() {
  const { t } = useTranslation("shared");
  return (
    <>
      <div className="test">{t("policy.title")}</div>
    </>
  );
}
export default Policy;