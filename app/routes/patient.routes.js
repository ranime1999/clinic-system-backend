module.exports = app => {
  const patients = require("../controllers/patient.controller.js");

  var router = require("express").Router();

  // Create a new Patient
  router.post("/", patients.create);

  // Retrieve all patients
  router.get("/", patients.findAll);

  // Retrieve a single Patient with id
  router.get("/:id", patients.findOne);

  // Update a Patient with id
  router.put("/:id", patients.update);

  // Delete a Patient with id
  router.delete("/:id", patients.delete);

  // Delete all patients
  router.delete("/", patients.deleteAll);

  app.use('/api/patients', router);
};
