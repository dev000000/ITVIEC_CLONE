import "./Header.scss";
import logo from "../../assets/images/nhieu viec (355 x 85 px).png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import avatarDefault from "@/assets/images/avatar-default.svg";
import { RxDashboard } from "react-icons/rx";
import { FaRegFileAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LuBriefcase } from "react-icons/lu";
import { BsMailbox2Flag } from "react-icons/bs";
import { MdMailOutline } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import Cascader from "../Cascader";
import LanguageSwitcher from "../LanguageSwitcher";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useState, useMemo } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSeekerStore } from "@/store/seekerStore";
import { useUserStore } from "@/store/userStore";
import { useCompanyStore } from "@/store/companyStore";
import { useTranslation } from "react-i18next";
import { logoutApi } from "@/services/authApi";
import { useIsSeekerLoggedIn } from "@/hooks/use-is-seeker-logged-in";
const jobItemsStatic = {
  header: "Việc làm IT",
  items: [
    {
      id: "skillchild1",
      label: "Việc làm IT theo kỹ năng",
      link: "/tim-viec-lam-it",
      child: [
        {
          id: 1,
          label: "HTML5",
          link: "/viec-lam-it/html5",
        },
        {
          id: 2,
          label: "MySQL",
          link: "/viec-lam-it/mysql",
        },
        {
          id: 3,
          label: "SQL",
          link: "/viec-lam-it/sql",
        },
        {
          id: 4,
          label: "Ruby",
          link: "/viec-lam-it/ruby",
        },
        {
          id: 5,
          label: "Ruby on Rails",
          link: "/viec-lam-it/ruby-on-rails",
        },
        {
          id: 6,
          label: "Android",
          link: "/viec-lam-it/android",
        },
        {
          id: 7,
          label: "iOS",
          link: "/viec-lam-it/ios",
        },
        {
          id: 8,
          label: ".NET",
          link: "/viec-lam-it/dotnet",
        },
        {
          id: 9,
          label: "English",
          link: "/viec-lam-it/english",
        },
        {
          id: 10,
          label: "Database",
          link: "/viec-lam-it/database",
        },
        {
          id: 11,
          label: "UI-UX",
          link: "/viec-lam-it/ui-ux",
        },
        {
          id: 12,
          label: "Project Manager",
          link: "/viec-lam-it/project-manager",
        },
        {
          id: 13,
          label: "Business Analyst",
          link: "/viec-lam-it/business-analyst",
        },
        {
          id: 14,
          label: "OOP",
          link: "/viec-lam-it/oop",
        },
        {
          id: 15,
          label: "Manager",
          link: "/viec-lam-it/manager",
        },
        {
          id: 16,
          label: "Linux",
          link: "/viec-lam-it/linux",
        },
        {
          id: 17,
          label: "Oracle",
          link: "/viec-lam-it/oracle",
        },
        {
          id: 18,
          label: "Mobile Apps",
          link: "/viec-lam-it/mobile-apps",
        },
        {
          id: 19,
          label: "Team Leader",
          link: "/viec-lam-it/team-leader",
        },
        {
          id: 20,
          label: "System Engineer",
          link: "/viec-lam-it/system-engineer",
        },
        {
          id: 21,
          label: "Embedded",
          link: "/viec-lam-it/embedded",
        },
        {
          id: 22,
          label: "QA QC",
          link: "/viec-lam-it/qa-qc",
        },
        {
          id: 23,
          label: "Designer",
          link: "/viec-lam-it/designer",
        },
        {
          id: 24,
          label: "J2EE",
          link: "/viec-lam-it/j2ee",
        },
        {
          id: 25,
          label: "Tester",
          link: "/viec-lam-it/tester",
        },
        {
          id: 26,
          label: "MVC",
          link: "/viec-lam-it/mvc",
        },
        {
          id: 27,
          label: "ReactJS",
          link: "/viec-lam-it/reactjs",
        },
      ],
      type: 4,
      viewmore: { active: true, link: "/tim-viec-lam-it" },
    },
    {
      id: "rankchild1",
      label: "Việc làm IT theo cấp bậc",
      link: "/viec-lam-it-theo-cap-bac",
      child: [
        {
          id: 1,
          label: "Phó phòng",
          link: "/viec-lam-it/pho-phong",
        },
        {
          id: 2,
          label: "Trưởng phòng",
          link: "/viec-lam-it/truong-phong",
        },
        {
          id: 3,
          label: "Giám đốc dự án",
          link: "/viec-lam-it/giam-doc-du-an",
        },
        {
          id: 4,
          label: "Quản lý cấp cao",
          link: "/viec-lam-it/quan-ly-cap-cao",
        },
        {
          id: 5,
          label: "Giám đốc điều hành",
          link: "/viec-lam-it/giam-doc-dieu-hanh",
        },
        {
          id: 6,
          label: "Chuyên viên",
          link: "/viec-lam-it/chuyen-vien",
        },
        {
          id: 7,
          label: "Phó giám đốc",
          link: "/viec-lam-it/pho-giam-doc",
        },
        {
          id: 8,
          label: "Trưởng ban",
          link: "/viec-lam-it/truong-ban",
        },
        {
          id: 9,
          label: "Phó ban",
          link: "/viec-lam-it/pho-ban",
        },
        {
          id: 10,
          label: "Quản lý dự án",
          link: "/viec-lam-it/quan-ly-du-an",
        },
      ],
      type: 3,
      viewmore: { active: true, link: "/viec-lam-it-theo-cap-bac" },
    },
    {
      id: "companychild1",
      label: "Việc làm IT theo công ty",
      link: "/viec-lam-it-theo-ten-cong-ty",
      child: [
        {
          id: 1,
          label: "VinAI",
          link: "/nha-tuyen-dung/vinai",
        },
        {
          id: 2,
          label: "Haravan",
          link: "/nha-tuyen-dung/haravan",
        },
        {
          id: 3,
          label: "Zalo AI",
          link: "/nha-tuyen-dung/zalo-ai",
        },
        {
          id: 4,
          label: "Tiki Corporation",
          link: "/nha-tuyen-dung/tiki-corporation",
        },
        {
          id: 5,
          label: "Shopee Vietnam",
          link: "/nha-tuyen-dung/shopee-vietnam",
        },
        {
          id: 6,
          label: "Lazada Vietnam",
          link: "/nha-tuyen-dung/lazada-vietnam",
        },
        {
          id: 7,
          label: "GMO-Z.com Vietnam",
          link: "/nha-tuyen-dung/gmo-z-com-vietnam",
        },
        {
          id: 8,
          label: "Axon Active Vietnam",
          link: "/nha-tuyen-dung/axon-active-vietnam",
        },
        {
          id: 9,
          label: "Sun* Inc.",
          link: "/nha-tuyen-dung/sun-inc",
        },
        {
          id: 10,
          label: "Rikkei Soft",
          link: "/nha-tuyen-dung/rikkei-soft",
        },
      ],
      type: 3,
      viewmore: { active: true, link: "/tim-viec-lam-it-theo-ten-cong-ty" },
    },
    {
      id: "citiechild1",
      label: "Việc làm IT theo thành phố",
      link: "",
      child: [
        {
          id: 1,
          label: "Hồ Chí Minh",
          link: "/viec-lam-it/ho-chi-minh",
        },
        {
          id: 2,
          label: "Hà Nội",
          link: "/viec-lam-it/ha-noi",
        },
        {
          id: 3,
          label: "Đà Nẵng",
          link: "/viec-lam-it/da-nang",
        },
        {
          id: 4,
          label: "Khác",
          link: "/viec-lam-it/others",
        },
      ],
      type: 1,
      viewmore: { active: false, link: "" },
    },
  ],
  link: "/viec-lam-it",
};
const blogItemsStatic = {
  header: "Blog",
  items: [
    {
      id: "salaryreportchild1",
      label: "Báo Cáo Lương IT",
      link: "/bao-cao-luong-it",
      child: [
        {
          id: 1,
          label: "Báo Cáo Lương IT 2024-2025",
          link: "bao-cao/luong-it-va-thi-truong-tuyen-dung-it-vietnam",
        },
        {
          id: 2,
          label: "Báo Cáo Lương IT 2023-2024",
          link: "/bao-cao-luong-it-2023-2024/",
        },
        {
          id: 3,
          label: "Báo Cáo Lương IT 2022-2023",
          link: "/bao-cao-luong-it-2022-2023/",
        },
      ],
      type: 1,
      viewmore: { active: false, link: "" },
    },
    {
      id: "itcareerchild1",
      label: "Sự Nghiệp IT",
      link: "/blog/category/su-nghiep-it/",
      child: [],
      type: 1,
      viewmore: { active: false, link: "" },
    },
    {
      id: "recruitmentchild1",
      label: "Ứng tuyển & Thăng Tiến",
      link: "/blog/category/ung-tuyen-va-thang-tien/",
      child: [],
      type: 1,
      viewmore: { active: false, link: "" },
    },
    {
      id: "expertisechild1",
      label: "Chuyên Môn IT",
      link: "/blog/category/chuyen-mon-it/",
      child: [],
      type: 1,
      viewmore: { active: false, link: "" },
    },
  ],
  link: "/blog/",
};
const companyItemsStatic = {
  header: "Top Công ty IT",
  link: "/cong-ty-it-tot-nhat-vietnam",
  items: [
    {
      id: "topcompanychild1",
      label: "Công Ty IT tốt nhất",
      link: "/cong-ty-it-tot-nhat-vietnam",
      child: [
        {
          id: 1,
          label: "Công ty IT tốt nhất 2025",
          link: "/cong-ty-it-tot-nhat-vietnam",
        },
        {
          id: 2,
          label: "Công ty IT tốt nhất 2024",
          link: "/cong-ty-it-tot-nhat-vietnam-2024",
        },
        {
          id: 3,
          label: "Công ty IT tốt nhất 2023",
          link: "/cong-ty-it-tot-nhat-vietnam-2023",
        },
        {
          id: 4,
          label: "Công ty IT tốt nhất 2022",
          link: "/cong-ty-it-tot-nhat-vietnam-2022",
        },
        {
          id: 5,
          label: "Công ty IT tốt nhất 2021",
          link: "/cong-ty-it-tot-nhat-vietnam-2021",
        },
        {
          id: 6,
          label: "Công ty IT tốt nhất 2020",
          link: "/cong-ty-it-tot-nhat-vietnam-2020",
        },
        {
          id: 7,
          label: "Công ty IT tốt nhất 2019",
          link: "/cong-ty-it-tot-nhat-vietnam-2019",
        },
      ],
      type: 1,
      viewmore: { active: false, link: "" },
    },
    {
      id: "reviewcompanychild1",
      label: "Review Công Ty",
      link: "/nha-tuyen-dung/review-cong-ty",
      child: [],
      type: 1,
      viewmore: { active: false, link: "" },
    },
  ],
};


interface HeaderProps {
  type: "home" | "employer";
}
const Header = ({ type }: HeaderProps) => {
  const fullName = useSeekerStore((state) => state.fullName);
  const avatarUrl = useSeekerStore((state) => state.avatarUrl);
  const isSeekerLoggedIn = useIsSeekerLoggedIn();
  const clearSeekerInfo = useSeekerStore((state) => state.clearSeekerInfo);
  const clearCompanyInfo = useCompanyStore((state) => state.clearCompanyInfo);
  const logout = useUserStore((state) => state.logout);
  const { t } = useTranslation("common");
  const [sidebar, setSidebar] = useState({
    left: false,
    right: false,
  });
  const [subsidebar, setSubSidebar] = useState({
    active: false,
    id: null,
  });
  const jobItems = useMemo(
    () => ({
      header: t("nav.jobs"),
      link: jobItemsStatic.link,
      items: [
        { ...jobItemsStatic.items[0], label: t("nav.jobsBySkill") },
        {
          ...jobItemsStatic.items[1],
          label: t("nav.jobsByLevel"),
          child: jobItemsStatic.items[1].child.map((level, i) => ({
            ...level,
            label: (
              [
                t("levels.deputyHead"),
                t("levels.head"),
                t("levels.projectDirector"),
                t("levels.seniorManager"),
                t("levels.ceo"),
                t("levels.specialist"),
                t("levels.deputyDirector"),
                t("levels.divisionHead"),
                t("levels.deputyDivision"),
                t("levels.projectManager"),
              ] as string[]
            )[i] ?? level.label,
          })),
        },
        { ...jobItemsStatic.items[2], label: t("nav.jobsByCompany") },
        { ...jobItemsStatic.items[3], label: t("nav.jobsByCity") },
      ],
    }),
    [t]
  );
  const blogItems = useMemo(
    () => ({
      header: t("nav.blog"),
      link: blogItemsStatic.link,
      items: [
        { ...blogItemsStatic.items[0], label: t("nav.salaryReport") },
        { ...blogItemsStatic.items[1], label: t("nav.itCareer") },
        { ...blogItemsStatic.items[2], label: t("nav.applyAndAdvance") },
        { ...blogItemsStatic.items[3], label: t("nav.itExpertise") },
      ],
    }),
    [t]
  );
  const companyItems = useMemo(
    () => ({
      header: t("nav.companies"),
      link: companyItemsStatic.link,
      items: [
        { ...companyItemsStatic.items[0], label: t("nav.topCompanies") },
        { ...companyItemsStatic.items[1], label: t("nav.reviewCompany") },
      ],
    }),
    [t]
  );
  const handleLogout = () => {
    Swal.fire({
      title: t("logout.title"),
      text: t("logout.confirm"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("buttons.yes"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logoutApi().catch(() => undefined);
        clearSeekerInfo();
        clearCompanyInfo();
        logout();
        Swal.fire({
          title: t("logout.successTitle"),
          text: t("logout.success"),
          icon: "success",
        });
      }
    });
  };
  if (type === "employer") {
    return (
      <header className="header">
        <div className="header__container">
          <div className="header__flex">
            <div className="header__logo">
              <Link to="/">
                <img src={logo} alt="logo itviec" />
              </Link>
            </div>
            <div className="header__nav">
              <div className="header__nav-left">
                <div className="header__nav-employer">{t("header.employer")}</div>
              </div>
              <ul className="header__nav-right">
                <li>
                  <LanguageSwitcher />
                </li>
                <li>
                  <a
                    href="/customer/login"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("buttons.login")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
  const allItems = [
    ...jobItems.items,
    ...companyItems.items,
    ...blogItems.items,
  ];
  const selectedSubmenu = allItems.find((item) => item.id === subsidebar.id);

  return (
    <>
      <header className="header">
        <div
          className={`header__sidebar header__sidebar${sidebar.right ? "--active" : ""
            } header__sidebar--right`}
        >
          <div
            className="header__sidebar-button header__sidebar-button--close"
            onClick={() => setSidebar({ ...sidebar, right: false })}
          >
            {" "}
            <span>{t("header.close")}</span> <IoClose />
          </div>
          <ul>
            <li>
              <Link to="tong-quan-ho-so">
                <RxDashboard />
                <span>{t("menu.overview")}</span>
              </Link>
            </li>
            <li>
              <Link to="ho-so-cv/quan-ly-cv">
                <FaRegFileAlt />
                <span>{t("menu.attachedCv")}</span>
              </Link>
            </li>
            <li>
              <Link to="ho-so-cv">
                <FiUser />
                <span>{t("menu.profile")}</span>
              </Link>
            </li>
            <li>
              <Link to="viec-lam-cua-toi">
                <LuBriefcase />
                <span>{t("menu.myJobs")}</span>
              </Link>
            </li>
            <li>
              <Link to="loi-moi-cong-viec">
                <BsMailbox2Flag />
                <span>{t("menu.jobInvitations")}</span>
              </Link>
            </li>
            <li>
              <Link to="dang-ky">
                <MdMailOutline />
                <span>{t("menu.emailSubscription")}</span>
              </Link>
            </li>
            <li>
              <Link to="cai-dat">
                <IoMdSettings />
                <span>{t("menu.settings")}</span>
              </Link>
            </li>
            <li>
              <Link to={''} onClick={handleLogout}>
                <MdOutlineLogout />
                <span>{t("menu.logout")}</span>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={`header__sidebar header__sidebar${sidebar.left ? "--active" : ""
            } header__sidebar--left`}
        >
          <div
            className={`header__sidebar-wrapbutton ${subsidebar.active ? "" : "header__sidebar-wrapbutton--single"
              }`}
          >
            {subsidebar.active && (
              <div
                className="header__sidebar-button "
                onClick={() => setSubSidebar({ active: false, id: null })}
              >
                <MdKeyboardArrowLeft />
                <span>{t("header.back")}</span>
              </div>
            )}
            <div
              className="header__sidebar-button header__sidebar-button--close"
              onClick={() => setSidebar({ ...sidebar, left: false })}
            >
              {" "}
              <span>{t("header.close")}</span> <IoClose />
            </div>
          </div>
          <ul>
            {subsidebar.active ? (
              <>
                {selectedSubmenu?.child.map((item) => (
                  <li key={`${selectedSubmenu.id}-${item.id}`} className="header__sidebar-sub">
                    <Link to={item.link}>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
                {selectedSubmenu?.viewmore.active && (
                  <>
                    <li key={`${selectedSubmenu.id}-viewmore`} className="header__sidebar-viewmore">
                      <Link to={selectedSubmenu.viewmore.link}>
                        <span>{t("header.viewAll")}</span>
                        <IoIosArrowForward />
                      </Link>
                    </li>
                  </>
                )}
              </>
            ) : (
              <>
                <li>
                  <Link to="/viec-lam-it">
                    <span>{t("nav.jobs")}</span>
                  </Link>
                </li>
                {jobItems.items.map((item) => (
                  <li
                    key={`${item.id}-child1`}
                    onClick={() => setSubSidebar({ active: true, id: item.id })}
                  >
                    <Link to={''}>
                      <span>{item.label}</span>
                      <IoIosArrowForward />
                    </Link>
                  </li>
                ))}
                <li
                  onClick={() =>
                    setSubSidebar({
                      active: true,
                      id: companyItems.items[0].id,
                    })
                  }
                >
                  <Link to={''}>
                    <span>{companyItems.header}</span>
                    <IoIosArrowForward />
                  </Link>
                </li>
                <li
                  onClick={() =>
                    setSubSidebar({ active: true, id: blogItems.items[0].id })
                  }
                >
                  <Link to={''}>
                    <span>{blogItems.header}</span>
                    <IoIosArrowForward />
                  </Link>
                </li>
                <li>
                  <Link to="/employer" target="_blank">
                    <span>{t("header.employer")}</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="header__container">
          <div className="header__flex">
            <div
              className="header__bar-mobile"
              onClick={() => setSidebar({ right: false, left: true })}
            >
              <FaBars />
            </div>
            <div className="header__logo">
              <Link to="/">
                <img src={logo} alt="logo itviec" />
              </Link>
            </div>
            <div className="header__login-mobile">
              {isSeekerLoggedIn ? (
                <li
                  className="header__menu header__menu--mobile"
                  onClick={() => setSidebar({ left: false, right: true })}
                >
                  <div className="header__menu-avatar">
                    <img src={avatarUrl || avatarDefault} alt="user_avatar" />
                  </div>
                  <div className="header__menu-name-wrap">
                    <IoIosArrowDown />
                  </div>
                  <div className="header__menu-dropdown">
                    <ul>
                      <li>
                        <Link to="tong-quan-ho-so">
                          <RxDashboard />
                          <span>{t("menu.overview")}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="ho-so-cv/quan-ly-cv">
                          <FaRegFileAlt />
                          <span>{t("menu.attachedCv")}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="ho-so-cv">
                          <FiUser />
                          <span>{t("menu.profile")}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="viec-lam-cua-toi">
                          <LuBriefcase />
                          <span>{t("menu.myJobs")}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="loi-moi-cong-viec">
                          <BsMailbox2Flag />
                          <span>{t("menu.jobInvitations")}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="dang-ky">
                          <MdMailOutline />
                          <span>{t("menu.emailSubscription")}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="cai-dat">
                          <IoMdSettings />
                          <span>{t("menu.settings")}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={''} onClick={handleLogout}>
                          <MdOutlineLogout />
                          <span>{t("menu.logout")}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <div className="header__wrap-login">
                  <Link to="/login">{t("buttons.login")}</Link>
                </div>
              )}
            </div>

            <div className="header__nav header__nav--home">
              <div className="header__nav-left">
                <Cascader menuItems={jobItems} type="small" />
                <Cascader menuItems={companyItems} type="small" />
                <Cascader menuItems={blogItems} type="small" />
              </div>
              <ul className="header__nav-right">
                <li>
                  <LanguageSwitcher />
                </li>
                <li>
                  <Link to="/employer" target="_blank">
                    {t("header.employer")}
                  </Link>
                </li>
                {isSeekerLoggedIn ? (
                  <li className="header__menu">
                    <div className="header__menu-avatar">
                      <img src={avatarUrl || avatarDefault} alt="user_avatar" />
                    </div>
                    <div className="header__menu-name-wrap">
                      <span className="header__menu-name">
                        {fullName || t("header.defaultUser")}
                      </span>
                      <IoIosArrowDown />
                    </div>
                    <div className="header__menu-dropdown">
                      <ul>
                        <li>
                          <Link to="tong-quan-ho-so">
                            <RxDashboard />
                            <span>{t("menu.overview")}</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="ho-so-cv/quan-ly-cv">
                            <FaRegFileAlt />
                            <span>{t("menu.attachedCv")}</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="ho-so-cv">
                            <FiUser />
                            <span>{t("menu.profile")}</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="viec-lam-cua-toi">
                            <LuBriefcase />
                            <span>{t("menu.myJobs")}</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="loi-moi-cong-viec">
                            <BsMailbox2Flag />
                            <span>{t("menu.jobInvitations")}</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="dang-ky">
                            <MdMailOutline />
                            <span>{t("menu.emailSubscription")}</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="cai-dat">
                            <IoMdSettings />
                            <span>{t("menu.settings")}</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={''} onClick={handleLogout}>
                            <MdOutlineLogout />
                            <span>{t("menu.logout")}</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li>
                    <Link to="/login">{t("buttons.login")}</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
