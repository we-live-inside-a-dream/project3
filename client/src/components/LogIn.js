// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// export default function LogIn({ setUser }) {
//   const [inputs, setInputs] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setInputs((values) => ({ ...values, [name]: value }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .post("/user/logIn", {
//         email: inputs.email,
//         password: inputs.password,
//       })
//       .then(function (response) {
//         if (response.data) setUser(response.data);
//         navigate("/profile");
//         console.log(response)
//       });
//   };

//   return (
//     <>
//       <StyledEmployeeForm />
//       <StyledFormWrapper>
//         <StyledForm>
//           <h2>Employee Description</h2>

//           <div>
//             <label>First Name</label>
//             <StyledInput
//               value={firstName}
//               onChange={(event) => onInputUpdate(event, setFirstName)}
//             />
//             <label>Last Name</label>
//             <StyledInput
//               value={lastName}
//               onChange={(event) => onInputUpdate(event, setLastName)}
//             />
//             <label>Email</label>
//             <StyledInput
//               value={email}
//               onChange={(event) => onInputUpdate(event, setEmail)}
//             />
//             <label>password</label>
//             <StyledInput
//               value={password}
//               type="password"
//               onChange={(event) => onInputUpdate(event, setPassword)}
//             />
//             <label>Phone Number</label>
//             <StyledInput
//               value={phoneNumber}
//               onChange={(event) => onInputUpdate(event, setPhoneNumber)}
//             />
//             <label>Positions</label>
//             <div>
//               {positions.map((position, index) => (
//                 <div key={index}>{position}</div>
//               ))}
//               <div>
//                 <StyledInput 
//                   value={positionToAdd}
//                   onChange={(event) => onInputUpdate(event, setPositionToAdd)}
//                 />
//                 <StyledButton onClick={onAddPosition}>Add</StyledButton>
//               </div>
//               {/* <StyledInput
//                 value={positions}
//                 onChange={(event) => onInputUpdate(event, setPositions)}
//               /> */}
//               <label>Status</label>
//               <StyledInput
//                 value={status}
//                 onChange={(event) => onInputUpdate(event, setStatus)}
//               />

//               <StyledButton onClick={postData}>Save Details</StyledButton>
//             </div>
//           </div>
//         </StyledForm>
//       </StyledFormWrapper>
//     </>
//   );
// };
