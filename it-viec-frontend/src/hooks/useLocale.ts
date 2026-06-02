import { useTranslation } from "react-i18next";

type SupportedLanguage = "vi" | "en";

export const useLocale = () => {
  const { i18n } = useTranslation();

  const changeLanguage = async (lang: SupportedLanguage) => {
    await i18n.reloadResources(lang);
    await i18n.changeLanguage(lang);
  };

  return {
    currentLang: i18n.language as SupportedLanguage,
    changeLanguage,
    isVietnamese: i18n.language === "vi",
    isEnglish: i18n.language === "en",
  };
};
