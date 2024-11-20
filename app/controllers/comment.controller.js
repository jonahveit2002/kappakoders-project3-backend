const db = require("../models");
const Comment = db.comment;

exports.getAll = async (req, res) => {
  const reviewId = req.params.reviewId;

  await Comment.findAll({
    where: {
      reviewId: reviewId,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error occured while trying to get all comments for review with id ${reviewId}`,
      });
    });
};

exports.create = async (req, res) => {
  const reviewId = req.params.reviewId;

  const validation = validateComment(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  const comment = {
    reviewId,
    ...req.body,
  };

  console.log(comment);

  await Comment.create(comment)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Something went wrong while trying to create a comment!",
      });
    });
};

exports.update = async (req, res) => {
  const validation = validateComment(req.body);

  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  const comment = {
    ...req.body,
  };

  await Comment.update(comment, { where: { id: req.params.id } })
    .then((data) => {
      if (data[0] > 0) {
        res.send({
          message: `Successfully updated Comment with id of ${req.params.id}!`,
        });
      } else {
        res.send({
          message: `Comment with id of ${req.params.id} doesn't exist!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while trying to update comment with id ${req.params.id}`,
      });
    });
};

exports.destroy = async (req, res) => {
  await Comment.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data == 1) {
        res.send({ message: "Comment deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${req.params.id}. Maybe Comment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to delete comment with id of ${req.params.id}`,
      });
    });
};

const validateComment = (data) => {
  const errors = [];

  // Validate the summary field
  if (!data.text || typeof data.text !== "string") {
    errors.push("text is required and must be a string.");
  } else if (data.text.trim().length === 0) {
    errors.push("text cannot be empty or whitespace.");
  }

  // Return validation results
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true };
};
