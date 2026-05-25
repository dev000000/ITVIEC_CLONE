import "./EmpoyerDashBoard.scss";
import EmployerStart from "@/components/EmployerStart";

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
