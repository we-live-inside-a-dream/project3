import EmployeeEditForm from "../../components/employee-list/EmployeeEditForm";

const CreateEmployeePage = () => {
    // let navigate = useNavigate();
    // async function createEmployee(newEmployee) {
    //     // const newEmployee = {firstName: "", lastName: ""}
    //     await fetch("/api/employeeProfile/create", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(newEmployee),
    //       // body: newEmployee
    //     });
    //     navigate("/employeeList");
    //   }
    return (
        <EmployeeEditForm  />
    )
}

export default CreateEmployeePage