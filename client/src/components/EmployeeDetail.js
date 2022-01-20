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
          <div>Last Name</div>
          <div>{employee?.lastName}</div>
          <div>Email</div>
          <div>{employee?.email}</div>
          <div>Password</div>
          <div>{employee?.password}</div> 
          <div>Phone Number</div>
          <div>{employee?.phoneNumber}</div> 
          <div>Positions</div>
          <ul>
              {
                employee?.positions.map((position, index) => (
                  <li key={index}>{position}</li>
                ))
              }
            </ul>
          <div>Status</div>
          <div>{employee?.status}</div>
        </div> 
        <EmployeeEditForm existingValues={employee} onSave={updateEmployee}/>
      </div>
    )
  }

  export default EmployeeDetail