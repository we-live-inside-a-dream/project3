
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeEditForm from "../components/employee-list/EmployeeEditForm";



const EmployeeEditPage = () => {
    let params = useParams()
    let employeeId = params.id
    let navigate = useNavigate()

    const [employee, setEmployee] = useState()
    

    useEffect(() => {
      const fetchEmployee = async () => {
        let fetchResult = await fetch('/api/employeeProfile/getByProfileId/' + employeeId)
        let fetchedEmployee = await fetchResult.json()
        console.log("Fetched Employee", fetchedEmployee)
        setEmployee(fetchedEmployee)
      }
      fetchEmployee()
    }, [employeeId])

    // fetch('/api/employeeProfile/' +employeeId

    // router.post("/updateEmployeeProfile/edit/:id", async (req, res) => {
    //   let updatedEmployeeProfile = req.body;
    //   let id = req.params.id;
    //   console.log(req.body)
    //   console.log("Updating employee profile", id, "with", updatedEmployeeProfile);
    //   let updatedEmployee = await updateEmployeeProfile(id, updatedEmployeeProfile);
    //   res.send(updatedEmployee);
    //   console.log("updated employee...", updatedEmployee);
    // });

    async function updateEmployee(updatedEmployee) {
        console.log("Posting to employee id", employeeId, "with data", updatedEmployee)
        await fetch(`/api/employeeProfile/update?id=${employeeId}`, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedEmployee)
      })
        navigate('/employeeList')
      }
  return (
    <div>
      <EmployeeEditForm existingValues={employee} onSave={updateEmployee}/>
    </div>
  )
}

export default EmployeeEditPage
