const express = require("express");
const router = express.Router();

const {
  createEmployeeProfile,
  getEmployeeProfileByProfileId,
  getEmployeeProfileByUserId,
  updateEmployeeProfile,
  deleteEmployeeProfile,
} = require("../model/employeeProfile");

// const {
//   createWorkExperience,
//   getByProfileId,
//   deleteWorkExperience,
// } = require('../model/workExperience')

// const mustBeLoggedIn = async (req, res, next) => {
//   if (req.user) {
//     next();
//     return;
//   }
//   res.sendStatus(401);
// };

let testProfileJson = {
  _id: { $oid: "61e097e23837027a49643b8c" },
  firstName: "Brian",
  lastName: "Sauco",
  email: "brian.sauco@gmail.com",
  phoneNumber: "4031244567",
};

/* 
 create a new profile for user
  param: same as profile schema
  return: status 200 and created profile if successful, status 500 otherwise
*/
router.post("/create", async (req, res) => {
  let profile = await createEmployeeProfile(testProfileJson);
  if (!profile) res.status(500).send("failed to create");
  res.status(200).send(profile);
});

/* 
 create a Work experience for the user profile
  param: profile, workExperience (see the schema)
  return: status 200 and created profile if successful, status 500 otherwise
*/
// router.post("/workExperience", async (req, res) => {
//   console.log(req.body);
//   let profile_id = req.body.profile._id;
//   let workExperience = req.body.workExperience;
//   let created = await createWorkExperience(profile_id, workExperience);
//   if (!created) res.status(500).send("failed to create");

//   res.status(200).send(created);
// });

/* 
  
  @test: curl -X POST http://localhost:5000/profile/update -H 'Content-Type: application/json' -d '{
  _id: { $oid: "61e097e23837027a49643b8c" },
  firstName: "Brian",
  lastName: "Sauco",
  email: "brian.sauco@gmail.com",
  phoneNumber: "4031244567",
}'
  update existing profile 
  param: new profile 
  return: updated profile model
*/
router.put("/update", mustBeLoggedIn, async (req, res) => {
  let employeeProfile = req.body;
  updateEmployeeProfile(profile, (updatedModel) => {
    res.status(200).send(updatedModel);
  });
});

/* 
   get user profile using userId
  param: user id
  return: profile object
*/
router.get("/getByUserId/:userId", mustBeLoggedIn, async (req, res) => {
  let userId = req.params.userId;
  let profile = await getEmployeeProfileByUserId(userId);
  res.status(200).send(profile);
});

/* 
   get list of all work experience for that profile
  param: profile
  return: work exprience objects
*/
// router.get("/workExperience/:profile_id", mustBeLoggedIn, async (req, res) => {
//   let profile_id = req.params.profile_id;
//   let workExperiences = await getEmployeeProfileByProfileId(profile_id);
//   res.status(200).send(workExperiences);
// });

/* 
 get user profile using profileId
  param: profile id
  return: profile object
*/
router.get("/getEmployeeByProfileId/:profileId", mustBeLoggedIn, async (req, res) => {
  let profileId = req.params.profileId;
  let profile = await getEmployeeProfileByProfileId(profileId);
  res.status(200).send(profile);
});

// router.delete("/workExperience/:id", async (req, res) => {
//   let deleted = await deleteWorkExperience(req.params.id);
//   res.status(200).send(deleted);
// });

/* 
 delete profile
  param: profile id
return: true if succeed false otherwise

*/
router.delete("/deleteEmployeeProfile/:profile_id", async (req, res) => {
  database
    .collection("EmployeeProfiles")
    .deleteOne({ id: parseInt(req.params.id) }, (err, result) => {
      if (err) throw error;
      res.send("Employee Profile has been deleted.");
    });
});

// router.delete(
//     '/',
//     passport.authenticate('jwt', { session: false }),
//     async (req, res) => {
//       const { id } = req.user;
//       try {
//         await EmployeeProfile.findOneAndDelete({ user: id });
//         await User.findOneAndDelete({ _id: id });
//         res.json({ message: "Success" });
//       } catch(e) {
//          res.sendStatus(500)
//       }
//     }
//   );

router.put("/updateProfilePicture", mustBeLoggedIn, async (req, res) => {
  updateProfile(req.body, (updatedModel) => {
    res.status(200).send(updatedModel);
  });
});

module.exports = router;
