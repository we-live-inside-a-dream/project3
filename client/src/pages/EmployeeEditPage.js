
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeEditForm from "../components/employee-list/EmployeeEditForm";
import StyledPage from "../components/reusable/StyledPage";



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
    <StyledPage>
      <EmployeeEditForm existingValues={employee} onSave={updateEmployee}/>
    </StyledPage>
  )
}

export default EmployeeEditPage
