import { useParams } from "react-router-dom";
import EmployeeDetail from "../../components/employee-list/EmployeeDetail";


const EmployeeDetailPage = () => {
  let params = useParams();
  return (
    <div>
      Loading Employee id: {params.id}
      <EmployeeDetail employeeId={params.id} />
    </div>
  );
};

export default EmployeeDetailPage;
