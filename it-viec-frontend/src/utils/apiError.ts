import type { AxiosError } from "axios";
import type { TFunction } from "i18next";

interface ApiErrorResponseData {
  code?: number;
  message?: string;
}

/**
 * Resolve API error message with this priority:
 * 1. i18n entry in common.apiErrors.<code>
 * 2. Server message from response data
 * 3. Shared default fallback
 */
export const getApiErrorMessage = (error: unknown, t: TFunction): string => {
  const axiosError = error as AxiosError<ApiErrorResponseData>;
  const code = axiosError?.response?.data?.code;

  if (code) {
    const translated = t(`apiErrors.${code}`, {
      ns: "common",
      defaultValue: "",
    });

    if (translated) {
      return translated;
    }
  }

  return (
    axiosError?.response?.data?.message ||
    t("apiErrors.default", { ns: "common" })
  );
};
