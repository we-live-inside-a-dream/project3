
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

    async function updateEmployee(updatedEmployee) {
        console.log("Posting to employee id", employeeId, "with data", updatedEmployee)
        await fetch('/api/updateEmployeeProfile/' +employeeId, {
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
