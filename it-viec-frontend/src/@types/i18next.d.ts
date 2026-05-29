import "i18next";
import type shared from "../../public/locales/en/shared.json";
import type jobseeker from "../../public/locales/en/jobseeker.json";

// react-i18next v17 / i18next v26: the generated t() type union only includes
// namespace-qualified keys ("common:nav.jobs"), not unqualified short-form keys
// ("nav.jobs"). Declaring resources would require every t() call to use the
// "ns:key" format. We intentionally omit resources here so t() accepts string,
// preserving the short-form call style used throughout the project.
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
  }
}
