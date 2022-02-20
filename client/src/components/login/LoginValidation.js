const emailValidation = function (value) {
  const regex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z]{2,8})?/g;
  //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (regex.test(value)) {
    return null;
    // alert("email is valid");
  } else if (!regex.test(value) && value !== "") {
    // alert("email is not valid");
    return "Invalid email. Please try again.";
  } else return "";
};
const passwordValidation = function (value) {
  // const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (regex.test(value)) {
    return null;
  } else if (!regex.test(value) && value !== "") {
    return "Please type the password.";
  } else return "";
};

module.exports = {
  emailValidation,
  passwordValidation,
};
