const { visits } = require("../models");
const db = require("../models");
const Patient = db.patients;
const Visit = db.visits;
const Op = db.Sequelize.Op;

// Create and Save a new visit
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
  
    // Create a Patient
    const visit = {
      FN: req.body.FN,
      treatment: req.body.treatment,
      amount_paid: req.body.amount_paid,
      date: req.body.date
    };
  
    // Save Patient in the database
    Visit.create(visit)
      .then(data => {
        res.status(200).send({
          message: "OK"
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the visit."
        });
      });
  };

  // Find a single Patient with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Visit.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find visit with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving visit with id=" + id
        });
      });
  };

exports.findAllForOne = (req, res) => {
  Visit.findAll({ where: { FN: req.params.id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving visits."
      });
    });
};
