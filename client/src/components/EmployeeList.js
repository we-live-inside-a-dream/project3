
import {useEffect, useState} from 'react'

const EmployeeRow = ({firstName, lastName, email, password, phoneNumber, positions, status, permissions, profilePicture, resume, onEmployeeSelected}) => (
  <tr onClick={() => onEmployeeSelected()}>
    <td>{firstName}</td>
    <td>{lastName}</td>
    <td>{password}</td>
    <td>{phoneNumber}</td>
    <td>{positions}</td>
    <td>{status}</td>
    <td>{permissions}</td>
    {/* <td>{profilePicture}</td> */}
    {/* <td>{resume}</td> */}
    <td>{email}</td>
  </tr>
)

const EmployeeList = ({setSelectedEmployeeId}) => {
  const [employees, setEmployees] = useState([])
  
  useEffect(() => {
    async function fetchData() {
      console.log('Fetching employee data!')
      let fetchResult = await fetch("/api/employeeProfile/employees")
      let employeeList = await fetchResult.json()
      setEmployees(employeeList)
    }
    fetchData()
  },[])
  return (
    <div>
      <h2>Employee List</h2>
        <table style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password </th>
              <th>Phone Number</th>
              <th>Positions</th>
              <th>Status</th>
              <th>Permissions</th>
              <th>Profile Picture</th>
              <th>Resume</th>
              <th>Home City</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.map((employee, index) => {
                function selectEmployee() {
                  console.log('Selected Employee called on', employee)
                  setSelectedEmployeeId(employee._id)
                }
                return <EmployeeRow 
                    key={index} onEmployeeSelected={selectEmployee} 
                    firstName={employee.EmployeeName} 
                    lastName={employee.lastName} 
                    email={employee.email}
                    password={employee.password}
                    phoneNumber={employee.phoneNumber}
                    positions={employee.positions}
                    status={employee.status}
                    permissions={employee.permissions}
                    profilePicture={employee.profilePicture}
                    resume={employee.resume}
                    />
              })
            }
          </tbody>
        </table>
    </div>
  ) 
}

export default EmployeeList