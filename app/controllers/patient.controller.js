const db = require("../models");
const Patient = db.patients;
const Op = db.Sequelize.Op;

// Create and Save a new Patient
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Patient
  const patient = {
    FN: req.body.FN,
    name: req.body.name,
    phone_number: req.body.phone_number
  };

  // Save Patient in the database
  Patient.create(patient)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Patient."
      });
    });
};

// Retrieve all Patients from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Patient.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving patients."
      });
    });
};

// Find a single Patient with an id
exports.findOne = (req, res) => {
  const FN = req.params.id;

  Patient.findByPk(FN)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Patient with FN=${FN}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Patient with FN=" + FN
      });
    });
};

// Update a Patient by the id in the request
exports.update = (req, res) => {
  const FN = req.params.id;

  Patient.update(req.body, {
    where: { FN: FN }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Patient was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Patient with FN=${FN}. Maybe Patient was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Patient with FN=" + FN
      });
    });
};

// Delete a Patient with the specified id in the request
exports.delete = (req, res) => {
  const FN = req.params.id;

  Patient.destroy({
    where: { FN: FN }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Patient was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Patient with FN=${FN}. Maybe Patient was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Patient with FN=" + FN
      });
    });
};

// Delete all Patients from the database.
exports.deleteAll = (req, res) => {
  Patient.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Patients were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all patients."
      });
    });
};

// find all published Patient
exports.findAllPublished = (req, res) => {
  Patient.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving patients."
      });
    });
};
