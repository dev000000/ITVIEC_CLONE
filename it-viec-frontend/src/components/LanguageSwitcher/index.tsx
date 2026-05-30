import { useLocale } from '@/hooks/useLocale';
import './LanguageSwitcher.scss';

const LanguageSwitcher = () => {
  const { currentLang, changeLanguage } = useLocale();

  return (
    <div className="language-switcher">
      <button
        className={`language-switcher__btn${currentLang === 'en' ? ' language-switcher__btn--active' : ''}`}
        onClick={() => changeLanguage('en')}
        disabled={currentLang === 'en'}
        aria-label="English"
      >
        EN
      </button>
      <span className="language-switcher__sep">|</span>
      <button
        className={`language-switcher__btn${currentLang === 'vi' ? ' language-switcher__btn--active' : ''}`}
        onClick={() => changeLanguage('vi')}
        disabled={currentLang === 'vi'}
        aria-label="Tiếng Việt"
      >
        VI
      </button>
    </div>
  );
};

export default LanguageSwitcher;
