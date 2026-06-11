// Trang xác thực tài khoản khi user click link trong email
// Đọc ?token= từ URL → gọi API → hiển thị kết quả: loading | success | error
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Result, Spin, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { activateAccountApi, resendActivationApi } from "@/services/authApi";
import { getApiErrorMessage } from "@/utils/apiError";

const { Text } = Typography;

type ActivationStatus = "loading" | "success" | "error";

function ActivateAccount() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation("auth");

  const [status, setStatus] = useState<ActivationStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [resendEmail, setResendEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [resendDone, setResendDone] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setErrorMessage(t("activation.missingToken"));
      return;
    }

    activateAccountApi(token)
      .then(() => setStatus("success"))
      .catch((err) => {
        setStatus("error");
        setErrorMessage(getApiErrorMessage(err, t));
        // Extract email from URL if passed as extra param for resend convenience
        const emailParam = searchParams.get("email");
        if (emailParam) setResendEmail(emailParam);
      });
  }, []);

  const handleResend = async () => {
    if (!resendEmail) return;
    setResending(true);
    try {
      await resendActivationApi({ email: resendEmail });
      setResendDone(true);
    } catch (err) {
      setErrorMessage(getApiErrorMessage(err, t));
    } finally {
      setResending(false);
    }
  };

  if (status === "loading") {
    return (
      <div style={styles.container}>
        <Spin size="large" tip={t("activation.verifying")} />
      </div>
    );
  }

  if (status === "success") {
    return (
      <div style={styles.container}>
        <Result
          status="success"
          title={t("activation.successTitle")}
          subTitle={t("activation.successSubtitle")}
          extra={[
            <Button
              type="primary"
              key="login"
              size="large"
              style={{ background: "#ed1b2f", borderColor: "#ed1b2f" }}
              onClick={() => navigate("/login")}
            >
              {t("activation.loginNow")}
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Result
        status="error"
        title={t("activation.errorTitle")}
        subTitle={<Text type="secondary">{errorMessage}</Text>}
        extra={[
          resendEmail && !resendDone ? (
            <Button
              key="resend"
              size="large"
              loading={resending}
              onClick={handleResend}
            >
              {t("activation.resendEmail")}
            </Button>
          ) : null,
          resendDone ? (
            <Text key="done" type="success">
              {t("activation.resendSuccess")}
            </Text>
          ) : null,
          <Button key="register" onClick={() => navigate("/register")}>
            {t("activation.registerAgain")}
          </Button>,
        ].filter(Boolean)}
      />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 16px",
  },
};

export default ActivateAccount;
