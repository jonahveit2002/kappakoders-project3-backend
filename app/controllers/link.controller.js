const db = require("../models");
const Links = db.links;
const utils = require("./utils/utils.js");

exports.getAllForUser = async (req, res) => {
    let userId = await utils.getUserId(req);
    await Links.findAll({ where: { userId: userId } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            `Some error ocurred while retrieving education for UserId:${userId}`,
        });
      });
};


exports.getForId = async (req, res) => {
    await Links.findOne({ where: { id: req.params.id } })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || `Some error ocurred while retrieving education`,
        });
      });
};

exports.create = async (req, res) => {
    const validation = validateLinkRequest(req.body);

    if (!validation.valid) {
        // Return an error message if validation fails
        return res.status(400).json({
          message: "Validation error",
          details: validation.errors,
        });
    }

    userId = await utils.getUserId(req);

    const link = {
        name: req.body.name,
        url: req.body.url,
        userId: userId,
    }

    await Links.create(link) 
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                err.message ||
                "Some error ocurred while trying to create a new education item",
            });
        });
};

exports.update = async (req, res) => {
    const validation = validateLinkRequest(req.body);

    if (!validation.valid) {
        // Return an error message if validation fails
        return res.status(400).json({
          message: "Validation error",
          details: validation.errors,
        });
    }

    const link = {
        name: req.body.name,
        url: req.body.url,
    }

    await Links.update(link, { where: { id: req.params.id } })
    .then((data) => {
      if (data[0] > 0) {
        res.send({
          message: `Successfully updated Link with id of ${req.params.id}!`,
        });
      } else {
        res.send({
          message: `Link with id of ${req.params.id} doesn't exist!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to update link item with id of ${req.params.id}`,
      });
    });
};

exports.delete = async (req, res) => {
    await Links.destroy({ where: { id: req.params.id } })
      .then((data) => {
        if (data == 1) {
          res.send({ message: "Link deleted successfully!" });
        } else {
          res.send({
            message: `Cannot delete Education with id=${req.params.id}. Maybe Education was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            `An error ocurred while trying to update link item with id of ${req.params.id}`,
        });
      });
  };
  


const validateLinkRequest = (data) => {
    const errors = [];
  
    // Check required string fields with maximum lengths
    if (
      !data.name ||
      typeof data.institution !== "string" ||
      data.name.length > 75
    ) {
      errors.push(
        "Name is required and must be a string with a maximum length of 75 characters."
      );
    }
  
    if (
      !data.url ||
      typeof data.credential_earned !== "string" 
    ) {
      errors.push(
        "URL is required and must be a string"
      );
    }
  };
  