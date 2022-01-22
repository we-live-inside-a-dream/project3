const express = require('express')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const employeeProfile = require('../models/employeeProfile')

const router = express.Router()

passport.use(new LocalStrategy( {
    usernameField: "email", passwordField: "password"
},
    function(username, password, done) {
        console.log('Passport is trying to verify a profile', username)
        employeeProfile.findEmployeeByProfileEmail(username)
        .then((user) => {
            if (!user || (user.password !== password)) {
                done(null, false, {message: 'Email not found or incorrect password'})
                return
            }
            done(null, user)
        })
        .catch(done)
    }
))
    
passport.serializeUser(function(user, done) {
    console.log('passport wants to store this user in a cookie', user)
    done(null, user.id)
})
  
passport.deserializeUser(function(id, done) {
    console.log('passport is trying to recover the user from the cookie', id)
    User.findById(id)
    .then((user) => {
        if (!user) {
            done(new Error('User not found or deleted'))
            return
        }
        done(null, user);
    })
    .catch(done)
});


router.post('/logIn', passport.authenticate('local'), async (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  let employeeProfileInfo = req.body.inputs;
  let user = await signIn(employeeProfileInfo)
  console.log('User login has succeeded!')
  console.log('Req.user is', req.user)
  res.sendStatus(200)
  res.send(user)
})

router.get("/logOut", async (req, res) => {
    req.logout();
    res.sendStatus(200);
  });

router.get('/loggedInUser', function(req, res) {
    res.send(req.user)
})

module.exports = router