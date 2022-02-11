const emailValidation = function (value) {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (regex.test(value)) {
    alert("email is valid");
  } else if (!regex.test(value) && value !== "") {
    alert("email is not valid");
  } else alert("email's not valid or invalid");
};

const phoneNumberValidation = function (value) {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (regex.test(value)) {
    alert(" phone # is valid");
  } else if (!regex.test(value) && value !== "") {
    alert("phone# not valid");
  } else alert(" phone #'s not valid or invalid");
};
const firstNameValidation = function (value) {
  if (value === "") {
    alert("firstName is invalid");
  } else alert("firstName is valid");
};
const lastNameValidation = function (value) {
  if (value === "") {
    alert("last name is required");
  } else alert("last name is ok");
};
const positionValidation = function (value) {
  if (value === "") {
    alert("at least one position is required");
  } else alert("position is ok");
};
// const passwordValidation = function (value) {
//   // const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$;
//   if (regex.test(value)) {
//     alert(" password is valid");
//   } else if (!regex.test(value) && value !== "") {
//     alert("Minimum eight characters, at least one letter and one number");
//   } else alert(" password not valid or invalid");
// };

module.exports = {
  emailValidation,
  phoneNumberValidation,
  firstNameValidation,
  lastNameValidation,
  positionValidation,
  // passwordValidation,
};
