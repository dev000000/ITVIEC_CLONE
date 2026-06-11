// Trang hiển thị sau khi đăng ký thành công
// Thông báo kiểm tra email + countdown + nút gửi lại
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { resendActivationApi } from "@/services/authApi";
import { getApiErrorMessage } from "@/utils/apiError";

const { Title, Paragraph, Text } = Typography;

const RESEND_COOLDOWN_SECONDS = 120;

function RegisterSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation("auth");

  const email: string = (location.state as { email?: string })?.email ?? "";

  const [countdown, setCountdown] = useState(RESEND_COOLDOWN_SECONDS);
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<"idle" | "success" | "error">("idle");
  const [resendError, setResendError] = useState("");

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (!email || countdown > 0) return;
    setResending(true);
    setResendStatus("idle");
    try {
      await resendActivationApi({ email });
      setResendStatus("success");
      setCountdown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      setResendStatus("error");
      setResendError(getApiErrorMessage(err, t));
    } finally {
      setResending(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <MailOutlined style={styles.icon} />

        <Title level={2} style={styles.title}>
          {t("registerSuccess.title")}
        </Title>

        <Paragraph style={styles.description}>
          {t("registerSuccess.description")}
        </Paragraph>

        {email ? (
          <div style={styles.emailBox}>
            <Text strong style={{ color: "#ed1b2f", fontSize: 16 }}>
              {email}
            </Text>
          </div>
        ) : null}

        <Paragraph type="secondary" style={styles.hint}>
          {t("registerSuccess.hint")}
        </Paragraph>

        {resendStatus === "success" && (
          <Alert
            type="success"
            message={t("registerSuccess.resendSuccess")}
            style={styles.alert}
            showIcon
          />
        )}

        {resendStatus === "error" && (
          <Alert
            type="error"
            message={resendError}
            style={styles.alert}
            showIcon
          />
        )}

        <div style={styles.actions}>
          <Button
            type="primary"
            size="large"
            loading={resending}
            disabled={countdown > 0}
            onClick={handleResend}
            style={
              countdown > 0
                ? {}
                : { background: "#ed1b2f", borderColor: "#ed1b2f" }
            }
          >
            {countdown > 0
              ? t("registerSuccess.resendCountdown", { seconds: countdown })
              : t("registerSuccess.resendButton")}
          </Button>

          <Button size="large" onClick={() => navigate("/login")}>
            {t("registerSuccess.goToLogin")}
          </Button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 16px",
    background: "#f4f7fa",
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    padding: "48px 40px",
    maxWidth: 520,
    width: "100%",
    textAlign: "center",
  },
  icon: {
    fontSize: 64,
    color: "#ed1b2f",
    marginBottom: 16,
  },
  title: {
    marginBottom: 12,
  },
  description: {
    color: "#555",
    fontSize: 15,
    lineHeight: 1.7,
    marginBottom: 12,
  },
  emailBox: {
    background: "#fff8f8",
    border: "1px solid #ffd6d6",
    borderRadius: 8,
    padding: "10px 20px",
    marginBottom: 12,
    display: "inline-block",
  },
  hint: {
    fontSize: 13,
    marginBottom: 20,
  },
  alert: {
    marginBottom: 16,
    textAlign: "left",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
};

export default RegisterSuccess;
