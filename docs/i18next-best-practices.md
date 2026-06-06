# Best Practices: Sử dụng i18next trong ReactJS

## Cấu trúc dự án

```
src/
├── i18n/
│   ├── index.ts          # Khởi tạo i18next
│   └── locales/
│       ├── en/
│       │   ├── common.json
│       │   ├── auth.json
│       │   └── dashboard.json
│       └── vi/
│           ├── common.json
│           ├── auth.json
│           └── dashboard.json
```

> ✅ Chia file theo **namespace** (feature/module), không dồn tất cả vào 1 file — dễ maintain và hỗ trợ lazy load.

---

## 1. Cài đặt

```bash
npm install i18next react-i18next i18next-http-backend i18next-browser-languagedetector
```

---

## 2. Khởi tạo i18next

```ts
// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)              // Load file từ /public/locales
  .use(LanguageDetector)     // Tự detect ngôn ngữ browser
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'auth', 'dashboard'],

    interpolation: {
      escapeValue: false,   // React đã escape sẵn
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
```

```tsx
// src/main.tsx — import TRƯỚC App
import './i18n';
import App from './App';
```

---

## 3. Sử dụng `useTranslation` hook

```tsx
import { useTranslation } from 'react-i18next';

function LoginPage() {
  const { t } = useTranslation('auth'); // chỉ định namespace

  return (
    <form>
      <h1>{t('login.title')}</h1>
      <button>{t('login.submit')}</button>
    </form>
  );
}
```

```json
// locales/vi/auth.json
{
  "login": {
    "title": "Đăng nhập",
    "submit": "Xác nhận"
  }
}
```

---

## 4. Các pattern quan trọng

### 4.1 Interpolation (biến nội suy)

```json
// common.json
{
  "greeting": "Xin chào, {{name}}!",
  "itemCount": "Có {{count}} sản phẩm"
}
```

```tsx
t('greeting', { name: 'Minh' })   // → "Xin chào, Minh!"
t('itemCount', { count: 5 })      // → "Có 5 sản phẩm"
```

### 4.2 Pluralization (số nhiều)

```json
{
  "message_one": "{{count}} tin nhắn",
  "message_other": "{{count}} tin nhắn"
}
```

```tsx
t('message', { count: 1 })  // → "1 tin nhắn"
t('message', { count: 5 })  // → "5 tin nhắn"
```

### 4.3 Trans component (chèn HTML/JSX vào bản dịch)

```json
// locales/vi/common.json
{
  "pleaseLogin": "Vui lòng <1>đăng nhập</1> để tiếp tục"
}
```

```tsx
import { Trans } from 'react-i18next';

<Trans i18nKey="pleaseLogin">
  Vui lòng <Link to="/login">đăng nhập</Link> để tiếp tục
</Trans>
```

### 4.4 Context (biến thể theo ngữ cảnh)

```json
{
  "welcome_male": "Chào anh {{name}}",
  "welcome_female": "Chào chị {{name}}"
}
```

```tsx
t('welcome', { context: 'female', name: 'Lan' })  // → "Chào chị Lan"
```

---

## 5. Lazy loading namespace

```tsx
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t, ready } = useTranslation('dashboard'); // lazy load

  if (!ready) return <Spinner />;
  return <h1>{t('title')}</h1>;
}

// Bọc bằng Suspense ở cấp cao hơn
<Suspense fallback={<LoadingScreen />}>
  <Dashboard />
</Suspense>
```

---

## 6. Custom hook tái sử dụng

```tsx
// hooks/useLocale.ts
import { useTranslation } from 'react-i18next';

export function useLocale() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: 'en' | 'vi') => {
    i18n.changeLanguage(lang);
  };

  return {
    currentLang: i18n.language,
    changeLanguage,
    isVietnamese: i18n.language === 'vi',
  };
}
```

```tsx
// Dùng trong component
function LanguageSwitcher() {
  const { currentLang, changeLanguage } = useLocale();

  return (
    <div>
      <button onClick={() => changeLanguage('vi')} disabled={currentLang === 'vi'}>
        🇻🇳 Tiếng Việt
      </button>
      <button onClick={() => changeLanguage('en')} disabled={currentLang === 'en'}>
        🇺🇸 English
      </button>
    </div>
  );
}
```

---

## 7. TypeScript — Type-safe translations

```ts
// src/@types/i18next.d.ts
import 'i18next';
import common from '../../public/locales/en/common.json';
import auth from '../../public/locales/en/auth.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      auth: typeof auth;
    };
  }
}
```

> ✅ Sau khi setup, `t('nonExistentKey')` sẽ báo lỗi TypeScript ngay lập tức.

---

## 8. Date / Number formatting

```tsx
import { useTranslation } from 'react-i18next';

function PriceDisplay({ price, date }: { price: number; date: Date }) {
  const { i18n } = useTranslation();

  const formattedPrice = new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: i18n.language === 'vi' ? 'VND' : 'USD',
  }).format(price);

  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    dateStyle: 'long',
  }).format(date);

  return (
    <div>
      <p>{formattedPrice}</p>
      <p>{formattedDate}</p>
    </div>
  );
}
```

---

## 9. Anti-patterns cần tránh

| ❌ Tránh | ✅ Nên làm |
|---|---|
| Gọi `i18n.t()` trực tiếp trong component | Dùng hook `useTranslation()` |
| Dồn toàn bộ key vào 1 file | Chia theo namespace/feature |
| Không đặt `fallbackLng` | Luôn set `fallbackLng: 'en'` |
| String concat: `t('hello') + name` | Dùng interpolation: `t('hello', { name })` |
| JSX trong string dịch | Dùng `<Trans>` component |
| Key phẳng: `"loginTitle"` | Dùng nested key: `"login.title"` |
| Không bọc Suspense khi lazy load | Luôn bọc `<Suspense fallback={...}>` |

---

## 10. Checklist setup dự án

- [ ] Cài đầy đủ: `i18next`, `react-i18next`, `i18next-http-backend`, `i18next-browser-languagedetector`
- [ ] Đặt file locale trong `/public/locales/{{lng}}/{{ns}}.json`
- [ ] Import `i18n/index.ts` trước `<App />` trong `main.tsx`
- [ ] Set `fallbackLng` để tránh hiển thị `undefined`
- [ ] Chia namespace theo feature (auth, dashboard, common...)
- [ ] Bọc App với `<Suspense>` nếu dùng lazy load namespace
- [ ] Thêm type definitions cho TypeScript
- [ ] Dùng [i18next-parser](https://github.com/i18next/i18next-parser) để tự động extract key từ code
- [ ] Format date/number bằng `Intl` API theo `i18n.language`

---

## 11. Tools hữu ích

| Tool | Mục đích |
|---|---|
| [i18next-parser](https://github.com/i18next/i18next-parser) | Tự động quét và extract key từ source code |
| [i18next-scanner](https://github.com/i18next/i18next-scanner) | Tương tự parser, hỗ trợ Grunt/Gulp |
| [i18n-ally (VS Code)](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) | Xem bản dịch inline trong editor |
| [Lokalise](https://lokalise.com) | Platform quản lý bản dịch cho team |
| [Crowdin](https://crowdin.com) | Collaborative translation platform |

---

*Generated: i18next + react-i18next best practices for ReactJS / TypeScript projects*
