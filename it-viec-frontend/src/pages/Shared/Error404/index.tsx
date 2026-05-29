import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Error404() {
  const { t } = useTranslation("shared");
  return (
    <div className="error-404">
      <h1>{t("error404.title")}</h1>
      <p>{t("error404.message")}</p>
      <Link to="/">{t("error404.backHome")}</Link>
    </div>
  );
}
export default Error404;