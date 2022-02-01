const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
  EmployeeProfile,
  logIn,
  findEmployeeByProfileEmail,
  getEmployeeProfileByProfileId,
} = require("../models/employeeProfile");

router.post("/login", passport.authenticate("local"), async (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  let userInfo = req.body;
  console.log(userInfo);
  let user = await logIn(userInfo);
  console.log("Log in successful!");
  res.json(user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function verify(email, password, done) {
      console.log("Verify");
      findEmployeeByProfileEmail(email)
        .then((employeeProfile) => {
          if (!employeeProfile.email || employeeProfile.password !== password) {
            console.log("failed", employeeProfile, password);
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

router.get("/loggedInUser", (req, res) => {
  const employeeId = req.employeeId;
  getEmployeeProfileByProfileId(employeeId, (err, user) => {
    if (err) {
      return res.status(401).json({
        status: false,
        message: "Authentication failed",
        data: undefined,
      });
    }
    if (user) {
      res.status(200).json({
        data: EmployeeProfile,
        message: "Authenticated successfully!",
        status: true,
      });
    }
  });
});

router.get("/logout", async (req, res) => {
  req.logout();
  res.sendStatus(200);
});

// const strategy = new LocalStrategy()

module.exports = router;
