import { Button, Result, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Paragraph } = Typography;

function EmployerRegisterSuccess() {
  const navigate = useNavigate();
  const { t } = useTranslation("employer");

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <CheckCircleOutlined style={styles.icon} />

        <Result
          status="success"
          title={t("register.successTitle")}
          subTitle={
            <Paragraph style={styles.subTitle}>
              {t("register.successMessage")}
            </Paragraph>
          }
          extra={[
            <Button
              key="home"
              type="primary"
              size="large"
              style={{ background: "#ed1b2f", borderColor: "#ed1b2f" }}
              onClick={() => navigate("/")}
            >
              {t("register.backToHome")}
            </Button>,
          ]}
        />
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
    padding: "16px 40px 40px",
    maxWidth: 560,
    width: "100%",
    textAlign: "center",
  },
  icon: {
    display: "none",
  },
  subTitle: {
    color: "#555",
    fontSize: 15,
    lineHeight: 1.7,
    maxWidth: 420,
    margin: "0 auto",
  },
};

export default EmployerRegisterSuccess;
