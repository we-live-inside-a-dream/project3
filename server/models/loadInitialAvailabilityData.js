let availabilityList = require("./employeeavailability.json");

let availabilityModel = require("./availability");

const loadInitialData = async () => {
  for (let availability of availabilityList) {
    console.log("Creating shift for", availability.firstName);
    let createdId = await availabilityModel.createAvailability(availability);
    console.log(
      "availability for",
      availability.firstName,
      "created with id",
      createdId
    );
  }
};
loadInitialData();
// availabilityList.forEach(async (availability) => {
//   console.log("Creating shift for", availability.firstName);
//   let createdId = await availabilityModel.createAvailability(availability);
//   console.log(
//     "availability for",
//     availability.firstName,
//     "created with id",
//     createdId
//   );
// });
