const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
  EmployeeProfile,
  logIn,
  findEmployeeByProfileEmail,
  getEmployeeProfileByProfileId
} = require("../models/employeeProfile");
const { Token } = require("../models/token");
const { auth } = require("../middlewares/auth");

router.post("/login", passport.authenticate('local'), async (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  let userInfo = req.body.inputs;
  let user = await logIn(userInfo);
  console.log("Log in successful!");
  res.sendStatus(200);
  res.send(user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function verify(email, password, done) {
      findEmployeeByProfileEmail(
        {email})
        .then((employeeProfile) => {
          if (!employeeProfile.email || !EmployeeProfile.password !== password) {
            done(null, false, {
              message: "Email/Password was incorrect. Please try again.",
            });
            return;
          }
          done(null, employeeProfile);
        })
        .catch(done);
    }
  )
);

passport.serializeUser(function (EmployeeProfile, done) {
  console.log("Passport wants to store this user in a cookie", EmployeeProfile);
  done(null, EmployeeProfile.id);
});

passport.deserializeUser(function (id, done) {
  console.log("passport is trying to recover the user from the cookie", id);
  getEmployeeProfileByProfileId(id)
    .then((email) => {
      if (!email) {
        done(new Error("User not found or deleted"));
        return;
      }
      done(null, email);
    })
    .catch(done);
});

// router.get("/authUser", auth, (req, res) => {
//   const employeeId = req.employeeId;
//   getEmployeeProfileByProfileId(employeeId, (err, user) => {
//     if (err) {
//       return res.status(401).json({
//         status: false,
//         message: "Authentication failed",
//         data: undefined,
//       });
//     }
//     if (user) {
//       res.status(200).json({
//         data: EmployeeProfile,
//         message: "Authenticated successfully!",
//         status: true,
//       });
//     }
//   });
// });

router.get("/logout", auth, (req, res) => {
  Token.findOneAndDelete(
    { _employeeId: req.employeeId, type: "login" },
    (err, doc) => {
      if (err)
        return res.status(401).json({
          status: false,
          message: "Server error, please try again.",
        });
      return res.status(200).json({
        status: true,
        message: "Logged out succesfully.",
      });
    }
  );
});

// const strategy = new LocalStrategy()

module.exports = router;
