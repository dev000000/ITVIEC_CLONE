import { useTranslation } from "react-i18next";

function Term() {
  const { t } = useTranslation("shared");
  return (
    <>
      <div className="test">{t("term.title")}</div>
    </>
  );
}
export default Term;