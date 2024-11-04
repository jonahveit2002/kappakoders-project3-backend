const db = require("../models");
const Award = db.award;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "userId cannot be null",
    });
    return;
  }

  if (!req.body.institution) {
    res.status(400).send({
      message: "institution cannot be null",
    });
    return;
  }

  if (!req.body.name) {
    res.status(400).send({
      message: "name cannot be null",
    });
    return;
  }

  if (!req.body.dateAwarded) {
    res.status(400).send({
      message: "dateAwarded cannot be null",
    });
    return;
  }

  // Create an award
  const award = {
    userId: req.body.userId,
    institution: req.body.institution,
    name: req.body.name,
    dateAwarded: req.body.dateAwarded,
  };

  // Save award in the database
  Award.create(award)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Award.",
      });
    });
};

// Retrieve all awards for a person from the database.
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId


  Award.findAll({ where: {userId: userId} })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving awards.",
      });
    });
};

// Find a single Award with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Award.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Award with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Award with id=" + id,
      });
    });
};

// Update an Award by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Award.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Award was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Award with id=${id}. Maybe Award was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Award with id=" + id,
      });
    });
};

// Delete an Award with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Award.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Award was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Award with id=${id}. Maybe Award was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Award with id=" + id,
      });
    });
};