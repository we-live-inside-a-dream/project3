import {useEffect, useState} from "react"
import EmployeeEditForm from "./EmployeeEditForm"


const EmployeeDetail = ({employeeId}) => {
  
    const [employee, setEmployee] = useState()

    
    useEffect(() => {
      const fetchEmployee = async () => {
        let fetchResult = await fetch('/api/employeeProfile/'+employeeId)
        let fetchedEmployee = await fetchResult.json()
        setEmployee(fetchedEmployee)
      }
      fetchEmployee()
    }, [employeeId])
    
    async function updateEmployee(updatedEmployee) {
      console.log("Posting to employee id", employeeId, "with data", updatedEmployee)
      await fetch('/api/employeeProfile/' +employeeId, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEmployee)
    })
    }
    return(
      <div>
          <h2>Employee information</h2>
          <div>
          <div>First Name</div>
          <div>{employee?.firstName}</div>
          <div>lastName</div>
          <div>{employee?.lastName}</div>
          <div>Home City</div>
          <div>{employee?.email}</div>
          <div>Super Powers</div>
          <div>Costume</div>
          <div>{employee?.password}</div> 
          <div>Nemesis</div>
          <div>{employee?.phoneNumber}</div>
          <div>{employee?.positions}</div>
          <div>{employee?.status}</div>
          <div>{employee?.permissions}</div>
          <div>{employee?.profilePicture}</div>
          <div>{employee?.resume}</div>
        </div> 
        <EmployeeEditForm existingValues={employee} onSave={updateEmployee}/>
      </div>
    )
  }

  export default EmployeeDetail