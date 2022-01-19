const mongoose = require("../models/mongooseDb");

const employeeProfileModel = require("../models/employeeProfile");

describe("EmployeeProfile model", () => {
  it("Creating employee Profile", async () => {
    // setup
    // execute
    let employeeId = await employeeProfileModel.createEmployeeProfile({
      firstName: "Bruce",
      lastName: "Sauco1",
      email: "brian.sauco1@gmail.com",
      password: "icarus1",
      phoneNumber: "5551111180",
      positions: "Supervisor",
      status: "Active",
    });
    // verify

    let findEmployee = await employeeProfileModel.getEmployeeProfileByProfileId(
      employeeId
    );
    console.log("findEmployee.firstName is ", findEmployee.firstName);
    console.log("Employee id is ", employeeId);
    expect(findEmployee.firstName).toBe("Bruce");
  });
});
