const express = require("express");
const router = express.Router();
const { createAvailability } = require("../models/availability");
const {
  createEmployeeProfile,
  getEmployeeProfileByProfileId,
  updateEmployeeProfile,
  listOfEmployees,
  getActiveEmployeeNames,
  EmployeeProfile,
} = require("../models/employeeProfile");

//mongodb UserVerification model
const UserVerification = require("../models/UserVerification");

//email handler
const nodemailer = require("nodemailer");

//unique string
const { v4: uuidv4 } = require("uuid");

//password handler
const bcrypt = require("bcrypt");

//path for static verified page
const path = require("path");

//env variables
require("dotenv").config();

//nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

//testing success nodemailer
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to send email.");
    console.log(success);
  }
});

//mongodb password reset model
const PasswordReset = require("../models/PasswordReset");

/* Creates a new employee profile.
 Params: same as employeeProfile Schema
 return:-status 200 and created profile if successful
        -status 500 if it fails.
*/
router.post("/create", async (req, res) => {
  let {
    firstName = firstName.trim(),
    lastName = lastName.trim(),
    email = email.trim(),
    password = password.trim(),
    phoneNumber = phoneNumber.trim(),
    positions = positions.trim(),
    status = status.trim(),
  } = req.body;
  if (
    firstName == "" ||
    lastName == "" ||
    email == "" ||
    password == "" ||
    phoneNumber == "" ||
    positions == ""
  ) {
    res.json({
      status: "FAILED",
      message: "Empty fields detected.",
    });
  } else if (!/^[a-zA-Z ]*$/.test(firstName)) {
    res.json({
      status: "FAILED",
      message: "Invalid name detected.",
    });
  } else if (!/^[a-zA-Z ]*$/.test(lastName)) {
    res.json({
      status: "FAILED",
      message: "Invalid name detected.",
    });
  } else if (
    !/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z]{2,8})?/g.test(email)
  ) {
    res.json({
      status: "FAILED",
      message: "Invalid email detected.",
    });
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    res.json({
      status: "FAILED",
      message: "Invalid password detected.",
    });
  } else {
    //checking if the user already exists
    let result = await EmployeeProfile.find({ email });
    if (result.length) {
      //user already exists
      res.json({
        status: "FAILED",
        message: "User with the provided email already exists.",
      });
    } else {
      //try to create new user

      //password handling
      try {
        let employeeProfileId = await createEmployeeProfile({
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          positions,
          status,
        });
        //handle account verification
        sendVerificationEmail({ _id: employeeProfileId, email: email }, res);
        createAvailability(employeeProfileId, firstName, lastName);
        if (!employeeProfileId) res.status(500).send("Failed to create.");
        res.status(200).json(employeeProfileId);
      } catch (error) {
        res.status(500).send(error);
        console.log(error);
      }
    }
  }
});

/* Update: Existing profile in database
   Params: New Profile 
   Return: Updated Profile Model
 */

router.post("/update/", async (req, res) => {
  let updatedEmployeeProfile = req.body;
  let id = req.query.id;
  // console.log(req.body);
  // console.log("Updating employee profile", id, "with", updatedEmployeeProfile);
  let updatedEmployee = await updateEmployeeProfile(id, updatedEmployeeProfile);
  res.send(updatedEmployee);
  // console.log("updated employee...", updatedEmployee);
});

/** Get: All employees in database
 *  Param: All profiles
 *  Return: All profiles
 */

router.get("/employees", async (req, res) => {
  let employeeList = await listOfEmployees();
  res.send(employeeList);
});

router.get("/employees/names", async (req, res) => {
  let employeeNames = await getActiveEmployeeNames();
  // console.log("empNames:",employeeNames)
  res.send(employeeNames);
});

router.get("/getByEmail/:email", async (req, res) => {
  let email = req.params.email;
  let employeeEmail = await findEmployeeByProfileEmail(email);
  res.status(200).send(employeeEmail);
});

router.get("/getByProfileId/:profileId", async (req, res) => {
  let profileId = req.params.profileId;
  // console.log("from API", profileId);
  let profile = await getEmployeeProfileByProfileId(profileId);
  // console.log("from API, profile", profile);
  res.json(profile);
});

router.put("/updateProfilePicture", async (req, res) => {
  updateProfile(req.body, (updatedModel) => {
    res.status(200).send(updatedModel);
  });
});

//UserVerification

//send Verification Email
const sendVerificationEmail = async ({ _id, email }, res) => {
  //url to be used in the email
  const currentUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5001/"
      : "http://daytwoday.herokuapp.com/";

  const uniqueString = uuidv4() + _id;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Verify your email",
    html: `<p>Verify your email address to complete the process and log in to your account.</p><p>This link <b>expires in One Week.</b>.</p><p>Click <a href=${
      currentUrl + "employeeProfile/verify/" + _id + "/" + uniqueString
    }>here</a> to proceed.</p>`,
  };
  try {
    const saltRounds = 10;
    let hashedUniqueString = bcrypt.hashSync(uniqueString, saltRounds);
    // set values in userVerification collection
    await UserVerification.create({
      userId: _id,
      uniqueString: hashedUniqueString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });
    await transporter.sendMail(mailOptions);
    //Email sent and verification record saved
  } catch (error) {
    console.log(error);
  }
};

//verify email
router.get("/verify/:userId/:uniqueString", async (req, res) => {
  let { userId, uniqueString } = req.params;

  let userVerification = await UserVerification.findOne({ userId });
  if (userVerification) {
    //user verification record exists so we proceed

    const { expiresAt } = userVerification;
    const hashedUniqueString = userVerification.uniqueString;

    //checking for expired unique string
    if (expiresAt < Date.now()) {
      await UserVerification.deleteOne({ userId });
      await EmployeeProfile.deleteOne({ _id: userId });
      let message = "Link has expired. Please contact your manager.";
      return res.json({
        error: message,
      });
    } //valid record exists so we validate user string
    //First we compare the hashed unique string
    let stringMatched = bcrypt.compareSync(uniqueString, hashedUniqueString);
    if (stringMatched) {
      //strings match
      await EmployeeProfile.updateOne({ _id: userId }, { verified: true });
      await UserVerification.deleteOne({ userId });
      res.json({
        success: "User has been verified.",
      });
    } else {
      //existing record but incorrect verification details passed/
      res.json({
        error: "Invalid user verification details passed. Check your inbox.",
      });
    }
  } else {
    res.json({
      error: "User verification records does not exist.",
    });
  }
});

//verified page route
// router.get("/verified", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../../client/src/pages/common/verified.html")
//   );
// });

//Password Reset
router.post("/requestPasswordReset", async (req, res) => {
  const { email } = req.body;

  //check if email exists
  await EmployeeProfile.findOne({ email });
  if (data) {
    //user exists
    //check if user is verified
    if (!data.verified) {
      res.json({
        error: "Email has not been verified yet. Please check your inbox.",
      });
    } else {
      //proceed with email to reset password
      sendResetEmail({ email: email }, res);
    }
  } else {
    res.json({
      status: "FAILED",
      message: "Account attached to that email does not exist.",
    });
  }
});

//send password reset email
const sendResetEmail = async ({ _id, email }, res) => {
  const resetString = uuidv4() + _id;
  const redirectUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5001/"
      : "http://daytwoday.herokuapp.com/";

  await PasswordReset.deleteMany({ userId: _id });
  //Reset records deleted successfully
  //Now we send the email.
  //mail options
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Password Reset",
    html: `<p>Password Reset request received.</p><p>Please use the link below to replace your old password.</p><p>This link will<b>expire in 24 hours</b>.</p><p>Click <a href=${
      redirectUrl + "resetPassword/" + _id + "/" + resetString
    }>here</a> to proceed.</p>`,
  };
  try {
    //hash the reset string
    const saltRounds = 10;
    let hashedResetString = bcrypt.hashSync(resetString, saltRounds);
    //set values in password reset collection
    await PasswordReset.create({
      userId: _id,
      resetString: hashedResetString,
      createdAt: Date.now(),
      expiresAt: Date.now() + 86400000,
    });
    await transporter.sendMail(mailOptions);
    //reset email sent and password reset record saved
  } catch (error) {
    console.log(error);
  }
};
//actually reset the password
router.post("/resetPassword", async (req, res) => {
  let { userId, resetString, newPassword } = req.body;

  let passwordReset = await PasswordReset.findOne({ userId });
  if (passwordReset) {
    //password reset exists so we proceeed

    const { expiresAt } = result;
    const hashedResetString = result.resetString;
    //checking for expired reset string
    if (expiresAt < Date.now()) {
      await PasswordReset.deleteOne({ userId });
      //Reset record deleted successfully
      return res.json({
        error: "Password reset link has expired",
      });
    } else {
      //valid reset record exists so validate the reset string
      //First compare the hashed reset string
      let resetStringMatched = bcrypt.compareSync(
        resetString,
        hashedResetString
      );
      if (resetStringMatched) {
        //strings matched
        //hash password again
        const saltRounds = 10;
        let hashedPassword = bcrypt.hash(newPassword, saltRounds);
        //update user password
        EmployeeProfile.updateOne(
          { _id: userId },
          { password: hashedPassword }
        );
        //update complete. Now delete reset record
        await PasswordReset.deleteOne({ userId });
        //both user record and reset record updated
        res.json({
          success: "Password has been reset successfully.",
        });
      } else {
        //Existing record but incorrect reset string passed.
        res.json({
          error: "Invalid password reset details passed.",
        });
      }
    }
  }
});
module.exports = router;
