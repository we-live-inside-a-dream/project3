const emailValidation = function (value) {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (regex.test(value)) {
    return null;
    // alert("email is valid");
  } else if (!regex.test(value) && value !== "") {
    // alert("email is not valid");
    return "email is not valid";
    // alert("email's not valid or invalid");
  } else return "not valid";
};

const phoneNumberValidation = function (value) {
  const regex = /^\d{9}$/;
  if (regex.test(value)) {
    return null;
    // alert(" phone # is valid");
  } else if (!regex.test(value) && value !== "") {
    // alert("phone# not valid");
    return "phone # is not valid";
  } else return "not valid";
};
const firstNameValidation = function (value) {
  if (value === "") {
    // alert("firstName is required");
    return "First Name is a required field";
  }
  // alert("firstName is valid");
  else return null;
};
const lastNameValidation = function (value) {
  if (value === "") {
    // alert("last name is required");
    return "last name is required";
  }
  // alert("last name is ok");
  else return null;
};
const positionValidation = function (value) {
  if (value.length === 0) {
    // alert("at least one position is required");
    return "at least one position is required";
  }
  // alert("position is ok");
  else return null;
};
const statusValidation = function (value) {
  if (value.length === 0) {
    // alert("at status is required");
    return "status is requried";
  }
  // alert("position is ok");
  else return null;
};

const passwordValidation = function (value) {
  // const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const regex = /^[A-Za-z]\w{7,15}$/;

  if (regex.test(value)) {
    return null;
  } else if (!regex.test(value) && value !== "") {
    return "Minimum eight characters, at least one letter and one number";
  } else return null;
};

const dateValidation = function (start, end) {
  if (start <= end) {
    return null;
  } else return "end date must be greater than or equal to start date";
};

module.exports = {
  emailValidation,
  phoneNumberValidation,
  firstNameValidation,
  lastNameValidation,
  positionValidation,
  statusValidation,
  passwordValidation,
  dateValidation,
};
