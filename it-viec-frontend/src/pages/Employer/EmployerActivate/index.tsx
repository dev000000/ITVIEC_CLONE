import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, Result, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { activateEmployerApi } from "@/services/authApi";
import { getApiErrorMessage } from "@/utils/apiError";

const { Text } = Typography;

type PageStatus = "form" | "success" | "error" | "missing-token";

function EmployerActivate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation("employer");
  const [form] = Form.useForm();

  const [pageStatus, setPageStatus] = useState<PageStatus>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = searchParams.get("token") ?? "";

  useEffect(() => {
    if (!token) {
      setPageStatus("missing-token");
    }
  }, [token]);

  const onFinish = async (values: { password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      form.setFields([
        { name: "confirmPassword", errors: [t("activate.passwordMismatch")] },
      ]);
      return;
    }

    try {
      setSubmitting(true);
      await activateEmployerApi({
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      setPageStatus("success");
    } catch (err) {
      setErrorMessage(getApiErrorMessage(err, t));
      setPageStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  if (pageStatus === "missing-token") {
    return (
      <div style={styles.container}>
        <Result
          status="error"
          title={t("activate.title")}
          subTitle={<Text type="secondary">{t("activate.missingToken")}</Text>}
        />
      </div>
    );
  }

  if (pageStatus === "success") {
    return (
      <div style={styles.container}>
        <Result
          status="success"
          title={t("activate.successTitle")}
          subTitle={t("activate.successMessage")}
          extra={[
            <Button
              type="primary"
              key="login"
              size="large"
              style={{ background: "#ed1b2f", borderColor: "#ed1b2f" }}
              onClick={() => navigate("/customer/login")}
            >
              {t("activate.loginBtn")}
            </Button>,
          ]}
        />
      </div>
    );
  }

  if (pageStatus === "error") {
    return (
      <div style={styles.container}>
        <Result
          status="error"
          title={t("activate.title")}
          subTitle={<Text type="secondary">{errorMessage}</Text>}
        />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{t("activate.title")}</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ width: "100%" }}
        >
          <Form.Item
            name="password"
            label={t("activate.passwordPlaceholder")}
            rules={[{ required: true, message: t("activate.passwordPlaceholder") }]}
          >
            <Input.Password size="large" placeholder={t("activate.passwordPlaceholder")} />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={t("activate.confirmPasswordPlaceholder")}
            rules={[{ required: true, message: t("activate.confirmPasswordPlaceholder") }]}
          >
            <Input.Password size="large" placeholder={t("activate.confirmPasswordPlaceholder")} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={submitting}
              style={{ background: "#ed1b2f", borderColor: "#ed1b2f" }}
            >
              {t("activate.submitBtn")}
            </Button>
          </Form.Item>
        </Form>
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
    padding: "40px",
    maxWidth: 440,
    width: "100%",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
};

export default EmployerActivate;
