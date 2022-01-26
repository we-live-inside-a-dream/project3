const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { EmployeeProfile } = require("../models/employeeProfile");
const { Token } = require("../models/token");
const { auth } = require("../middlewares/auth");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function verify(email, password, done) {
      EmployeeProfile.findEmployeeByProfileEmail(email)
        .then((email) => {
          if (!email) {
            return done(null, false);
          }
          if (!email || employeeProfile.password !== password) {
            done(null, false, {
              message: "Email not found or incorrect password",
            });
            return;
          }
          done(null, username);
        })
        .catch(done);
    }
  )
);

passport.serializeUser(function (email, done) {
  console.log("passport wants to store this user in a cookie", email);
  done(null, email.id);
});

passport.deserializeUser(function (id, done) {
  console.log("passport is trying to recover the user from the cookie", id);
  User.findById(id)
    .then((email) => {
      if (!email) {
        done(new Error("User not found or deleted"));
        return;
      }
      done(null, email);
    })
    .catch(done);
});

router.post("/login", (req, res) => {
  EmployeeProfile.findOne({ email: req.body.email })
    .exec()
    .then((employeeProfile) => {
      if (!employeeProfile) {
        return res.status(401).json({
          message: "User not found",
          data: undefined,
        });
      }
      bcrypt.compare(
        req.body.pasword,
        employeeProfile.password,
        async (err, result) => {
          if (err) {
            return res.status(401).json({
              status: false,
              message: "Server error, authentication failed",
              data: undefined,
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: employeeProfile.email,
                employeeId: employeeProfile._id,
              },
              process.env.JWT_KEY,
              {
                expireIn: "2h",
              }
            );
            await Token.findOneAndpdate(
              { _employeeId: employeeProfile._id, type: "login" },
              { token: token },
              { new: true, upsert: true }
            );
            return res.status(200).json({
              status: true,
              message: "Logged in successfully.",
              data: {
                token,
                employeeProfile,
              },
            });
          }
          return res.status(401).json({
            status: true,
            message: "Incorrect password, please try again.",
            data: undefined,
          });
        }
      );
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: "Server error, authentication failed.",
        data: undefined,
      });
    });
});

// router.post("/login", (req, res) => {
//   // If this function gets called, authentication was successful.
//   // `req.user` contains the authenticated user.
//   let employeeProfileInfo = req.body.inputs;
//   let user = await logIn(employeeProfileInfo);
//   console.log("User login has succeeded!");
//   console.log("Req.user is", req.user);
//   res.sendStatus(200);
//   res.send(user);
// });

router.get("/loggedInUser", auth, (req, res) => {
  const employeeId = req.employeeId
  EmployeeProfile.findById(employeeId, (err, customer) => {
    if(err){
      return  res.status(401).json({
        status: false,
        message: "Authentication failed",
        data: undefined
      })
    }
    if(customer){
      res.status(200).json({
        data: employeeProfile,
        message: "Authenticated successfully!",
        status: true,
      })
    }
  })
})

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
