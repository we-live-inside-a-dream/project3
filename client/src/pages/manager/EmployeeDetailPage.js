import { Link, useParams } from "react-router-dom";
import EmployeeDetail from "../../components/employee-list/EmployeeDetail";
import StyledPage from "../../components/reusable/styled-page/StyledPage";

const EmployeeDetailPage = () => {
  let params = useParams();
  return (
    <StyledPage>
      Loading Employee id: {params.id}
      <EmployeeDetail employeeId={params.id} />
      <Link to="edit">Edit Employee</Link>
    </StyledPage>
  );
};

export default EmployeeDetailPage;
