const mongoose = require('../../../../test/d2d/server/models/mongooseDb')

const User = mongoose.model('schedule', {
    name: String,
    phone: String,
    email: String,
})


// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   password: { type: String, required: true }
// });

// const userModel = mongoose.model("User", userSchema);

// const hashPassword = (password) => {
//   return password;
// };

// //create new user
// const addUser = async (userInfo) => {
//   let hashedPassword = hashPassword(userInfo.password);

//   let user = new userModel(userInfo);
//   try {
//     await user.save();
//     let emptyProfile = {
//       userId: user._id,
//     };
//     await createEmployeeProfile(emptyProfile);
//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

// //sign user in with email and password
// const signIn = async (userInfo) => {
//   let user = await userModel.find({
//     email: userInfo.email,
//     password: userInfo.password,
//   });
//   return user;
// };

// const findByUserEmail = async (email) => {
//   let user = await userModel.findOne({ email });
//   return user;
// };

// const findById = async (id) => {
//   let user = await userModel.findById(id);
//   return user;
// };

// const updateUser = async (id, newUser) => {
//   let user = await userModel.findByIdAndUpdate(id, newUser);
//   return user;
// };

// module.exports = { updateUser, userModel, addUser, signIn, findByUserEmail, findById };