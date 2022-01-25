import {useEffect, useState} from "react"
import EmployeeEditForm from "./EmployeeEditForm"
import { useParams } from "react-router-dom"


const EmployeeDetail = ({employeeId}) => {
  
  let params = useParams() 

    const [employee, setEmployee] = useState()
    
    useEffect(() => {
      let profileId = params.id
      console.log("params", params.id)
      const fetchEmployee = async () => {
        let fetchResult = await fetch('/api/employeeProfile/getByProfileId/'+profileId)
        let fetchedEmployee = await fetchResult.json()
        console.log("Fetched Employee", fetchedEmployee)
        setEmployee(fetchedEmployee)
      }
      fetchEmployee()
    }, [params.id])
    
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