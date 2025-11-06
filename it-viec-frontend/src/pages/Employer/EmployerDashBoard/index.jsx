import { Col, Row } from "antd";
import Card from "../../../components/Card";
import "./EmpoyerDashBoard.scss";
import { formattedDate } from "../../../helpers/formattedDate";
import ButtonSearch from "../../../components/ButtonSearch";
import EmployerStart from "../../../components/EmployerStart";
function EmployerDashBoard() {
  return (
    <>
      <div className="dashboard-employer">
        <EmployerStart content="DashBoard" type="search" />
      </div>
    </>
  );
}
export default EmployerDashBoard;
