import {useEffect, useState} from "react"


const EmployeeEditForm = ({existingValues, onSave}) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState([])
    const [phoneNumber, setPhoneNumber] = useState('')
    const [positions, setPositions] = useState('')
    const [status, setStatus] = useState('')
    const [permissions, setPermissions] = useState('')
    const [profilePicture, setProfilePicture] = useState('')
    const [resume, setResume] = useState('')
    

    useEffect(() =>{
        if (existingValues){
            setFirstName(existingValues.superheroName)
            setLastName(existingValues.alterEgo)
            setEmail(existingValues.homeCity)
            setPassword(existingValues.superpowers)
            setPhoneNumber(existingValues.costume)
            setPositions(existingValues.nemesis)
            setStatus(existingValues.nemesis)
            setPermissions(existingValues.nemesis)
            setProfilePicture(existingValues.nemesis)
            setResume(existingValues.nemesis)
        }
    }, [existingValues])


    function onInputUpdate(event, setter ){
        let newValue = event.target.value
        setter(newValue)
    }

    async function createEmployee({ newEmployee }) {
        await fetch("/api/employeeProfile/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEmployee),
        });
      }
      
    async function postData(){
        let newEmployeeInfo = {
            firstName, lastName, email, password, phoneNumber, positions, status, permissions, profilePicture, resume
        }
        console.log('Saving new employee information', newEmployeeInfo)
        await createEmployee(newEmployeeInfo)
    }

    return (
        <div>
            <h2>Employee Description</h2>
            <div>
                <label>First Name</label>
                <input value={firstName} onChange={(event) => onInputUpdate(event, setFirstName) }/>
                <label>Last Name</label>
                <input value={lastName} onChange={(event) => onInputUpdate(event, setLastName) }/>
                <label>Email</label>
                <input value={email} onChange={(event) => onInputUpdate(event, setEmail) }/>
                <label>password</label>
                <input value={password} type="password" onChange={(event) => onInputUpdate(event, setPassword) }/>
                <label>Phone Number</label>
                <input value={phoneNumber} onChange={(event) => onInputUpdate(event, setPhoneNumber) }/>
                <label>Positions</label>
                <input value={positions} onChange={(event) => onInputUpdate(event, setPositions) }/>
                <label>Status</label>
                <input value={status} onChange={(event) => onInputUpdate(event, setStatus) }/>
                <label>Permissions</label>
                <input value={permissions} onChange={(event) => onInputUpdate(event, setPermissions) }/>
                <label>Profile Picture</label>
                <input value={profilePicture} onChange={(event) => onInputUpdate(event, setProfilePicture) }/>
                <label>Resume</label>
                <input value={resume} onChange={(event) => onInputUpdate(event, setResume) }/>

                <button onClick={postData}>Save Details</button>
            </div>

        </div>
    )

}

export default EmployeeEditForm