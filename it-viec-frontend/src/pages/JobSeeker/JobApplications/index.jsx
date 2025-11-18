import { useEffect, useState } from "react";
import "./JobApplications.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import logo from "../../../assets/images/nhieu viec (355 x 85 px).png";
import { Form, Input, Select } from "antd";
import ButtonSubmit from "../../../components/Button";
import { VIETNAM_CITIES } from "../../../constants";
import { useSelector } from "react-redux";
import {
  checkApplicationExist,
  getJobDetailBySlug,
  getSeekerInforByUserId,
  postApplication,
} from "../../../services/SeekerServices";
import Swal from "sweetalert2";
import { setSeekerFullInfo } from "../../../actions/Seeker";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { isObjectEmpty } from "../../../helpers/checkObject";
const maxCountCity = 3;
function JobApplications() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { slug } = useParams();
  const seeker = useSelector((state) => state.SeekerReducer);
  const isLogin = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const [desiredLocations, setDesiredLocations] = useState(
    seeker.desiredLocations || []
  );
  const [coverLetter, setCoverLetter] = useState(seeker.coverLetter || "");
  const [jobId, setJobId] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [companyId, setCompanyId] = useState(0);
  const [isValidJob, setIsValidJob] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const validateJobSlug = async () => {
      try {
        if (!slug) {
          navigate("/");
          return;
        }
        const slugParts = slug.split("-");
        const extractedJobId = slugParts[slugParts.length - 1];
        if (!extractedJobId || isNaN(extractedJobId)) {
          Swal.fire({
            icon: "error",
            title: "Invalid Job",
            text: "Job ID không hợp lệ!",
          });
          navigate("/");
          return;
        }
        const jobDetails = await getJobDetailBySlug(slug);
        console.log("Job Details:", jobDetails);
        if (jobDetails && jobDetails.length > 0) {
          setJobId(parseInt(extractedJobId));
          setJobTitle(jobDetails[0].title || "");
          setIsValidJob(true);
          setCompanyId(jobDetails[0].companyId || 0);
        } else {
          Swal.fire({
            icon: "error",
            title: "Job Not Found",
            text: "Không tìm thấy công việc với ID này!",
          });
          navigate("/");
          return;
        }
      } catch (error) {
        console.error("Error validating job slug:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Có lỗi xảy ra khi kiểm tra công việc!",
        });
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    validateJobSlug();
  }, [slug, navigate]);
  useEffect(() => {
    const loadSeekerInfo = async () => {
      if (!seeker.isLoaded || seeker.userId != isLogin.id) {
        try {
          const seekerInfo = await getSeekerInforByUserId(isLogin.id);
          if (seekerInfo && seekerInfo.length > 0) {
            dispatch(setSeekerFullInfo(seekerInfo[0]));
          }
        } catch (error) {
          console.error("Error fetching seeker info:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Có lỗi xảy ra khi tải thông tin ứng viên!",
          });
        }
      }
    };
    if (isLogin.id && !isLoading) {
      loadSeekerInfo();
    }
  }, [isLogin.id, isLoading, dispatch]);
  useEffect(() => {
    if (seeker.isLoaded) {
      const formData = {
        fullName: seeker.fullName || "",
        phoneNumber: seeker.phoneNumber || "",
        desiredLocations: seeker.desiredLocations || [],
        coverLetter: seeker.coverLetter || "",
      };

      form.setFieldsValue(formData);
      setDesiredLocations(seeker.desiredLocations || []);
      setCoverLetter(seeker.coverLetter || "");
    }
  }, [seeker.isLoaded, form]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = async (values) => {
    if (!jobId || !isValidJob) {
      Swal.fire({
        icon: "error",
        title: "Invalid Job",
        text: "Không thể gửi đơn ứng tuyển cho công việc không hợp lệ!",
      });
      return;
    }
    try {
      const checkApplication = await checkApplicationExist({
        seekerId: seeker.id,
        jobId: jobId,
      });
      if( checkApplication && checkApplication.length > 0) {
        Swal.fire({
          icon: "warning",
          title: "Đơn ứng tuyển đã tồn tại",
          text: "Bạn đã ứng tuyển cho công việc này trước đó!",
        });
        return;
      }
      const applicationData = {
        seekerId: seeker.id,
        jobId: jobId,
        companyId: companyId || 0,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        resumeUrl: seeker.resumeUrl || "",
        coverLetter: values.coverLetter || "",
        desiredLocations: values.desiredLocations || [],
        appliedAt: dayjs().toISOString(),
        status: "Pending",
        employerMessage: "",
      };
      const applicationResult = await postApplication(applicationData);
      console.log("Application Result:", applicationResult);
      if (!isObjectEmpty(applicationResult)) {
        Swal.fire({
          title: "Đơn ứng tuyển đã được gửi thành công!",
          text: "Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Không thể gửi đơn ứng tuyển, vui lòng thử lại sau!",
        });
        return;
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Có lỗi xảy ra khi gửi đơn ứng tuyển!",
      });
      return;
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isValidJob) {
    return (
      <div>
        <h2>Không tìm thấy công việc với ID này!</h2>
        <Link to="/">Quay lại trang chủ</Link>
      </div>
    );
  }
  return (
    <>
      <div className="job-applications">
        <div className="job-applications__background"></div>
        <div className="job-applications__content">
          <div className="icontainer-sm">
            <div className="job-applications__header">
              <Link
                className="job-applications__header-back"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <IoIosArrowBack /> <span>Quay lại</span>{" "}
              </Link>
              <div className="job-applications__header-logo">
                <img src={logo} alt="logo_nhieu_viec" />
              </div>
            </div>
            <div className="job-applications__form">
              <Form
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <h2 className="job-applications__name-job">
                  {jobTitle ? jobTitle : "Công việc không hợp lệ"}
                </h2>
                <h3 className="job-applications__title">Thông tin cơ bản</h3>
                <Form.Item
                  label={
                    <label style={{ fontSize: "16px", color: "#a6a6a6" }}>
                      Họ và Tên
                    </label>
                  }
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Please input yourname!",
                      valueType: "text",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  label={
                    <label style={{ fontSize: "16px", color: "#a6a6a6" }}>
                      Số điện thoại
                    </label>
                  }
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input phonenumber!",
                      valueType: "number",
                      pattern: /^[0-9]+$/,
                    },
                    {
                      message: "Please input number!",
                      valueType: "number",
                      pattern: /^[0-9]+$/,
                    },
                  ]}
                >
                  <Input size="large" maxLength={10} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "5px" }}
                  name="desiredLocations"
                  label={
                    <label style={{ fontSize: "16px", color: "#a6a6a6" }}>
                      Nơi làm việc mong muốn
                    </label>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please select city!",
                      type: "array",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Please select city"
                    value={desiredLocations}
                    onChange={setDesiredLocations}
                    options={VIETNAM_CITIES}
                    maxCount={3}
                    size="large"
                  ></Select>
                </Form.Item>
                <div>
                  {" "}
                  {desiredLocations.length}/{maxCountCity} địa điểm
                </div>
                <h3>Thư xin việc (Không bắt buộc)</h3>
                <Form.Item
                  name="coverLetter"
                  label={
                    <label style={{ fontSize: "16px", color: "#a6a6a6" }}>
                      Những kỹ năng, dự án hay thành tựu nào chứng tỏ bạn là một
                      ứng viên tiềm năng cho vị trí ứng tuyển này?
                    </label>
                  }
                  rules={[
                    {
                      required: false,
                      message: "Please input cover letter!",
                    },
                  ]}
                  style={{ marginBottom: "5px" }}
                >
                  <Input.TextArea
                    onChange={(e) => {
                      setCoverLetter(e.target.value);
                    }}
                    maxLength={500}
                    rows={6}
                    placeholder="Nêu nhiều ví dụ cụ thể để làm hồ sơ ứng tuyển của bạn thuyết phục hơn..."
                    size="large"
                  />
                </Form.Item>
                <div style={{ fontSize: "16px", color: "#a6a6a6" }}>
                  Còn lại {500 - coverLetter.length} trong tổng số 500 ký tự{" "}
                </div>
                <Form.Item label={null}>
                  <ButtonSubmit text="Gửi CV của tôi" type="max" />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobApplications;
