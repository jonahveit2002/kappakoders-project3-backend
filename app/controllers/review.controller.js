const db = require("../models");
const Review = db.review;
const Comment = db.comment;
const ResumeSection = db.resumesection;

exports.getAll = async (req, res) => {
  const resumeId = req.params.resumeId;

  await Review.findAll({
    where: {
      resumeId: resumeId,
    },
    include: [
      {
        model: Comment,
        as: "comment",
        include: [
          {
            model: ResumeSection,
            as: "resumeSection",
          },
        ],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while trying to fetch all reviews for resume with id ${resumeId}`,
      });
    });
};

exports.getForId = async (req, res) => {
  const id = req.params.id;

  await Review.findOne({
    where: {
      id: id,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Something went wrong while trying to fetch all reviews for review ${id}`,
      });
    });
};

exports.startReview = async (req, res) => {
  const resumeId = req.params.resumeId;

  const review = {
    resumeId,
    summary: "",
    status: "in-review",
  };

  try {
    // Check if a review is already in progress
    const existingReview = await Review.findOne({
      where: { status: "in-review" },
    });
    if (existingReview) {
      return res.send({
        message: "There is already a review in progress for this resume.",
      });
    }

    // Create a new review
    const createdReview = await Review.create(review);
    return res.send(createdReview);
  } catch (err) {
    // Handle errors for both queries
    return res.status(500).send({
      message:
        err.message || "Something went wrong while trying to create a review!",
    });
  }
};

exports.update = async (req, res) => {
  const resumeId = req.params.resumeId;
  const reviewId = req.params.id;

  const validation = validateUpdate(req.body);
  if (!validation.valid) {
    // Return an error message if validation fails
    return res.status(400).json({
      message: "Validation error",
      details: validation.errors,
    });
  }

  const review = {
    resumeId,
    ...req.body,
  };

  await Review.update(review, { where: { id: reviewId } })
    .then((data) => {
      if (data[0] > 0) {
        res.send({
          message: `Successfully updated Review with id of ${req.params.id}!`,
        });
      } else {
        res.send({
          message: `Review with id of ${req.params.id} doesn't exist!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Something went wrong while trying to create a review!",
      });
    });
};

exports.destroy = async (req, res) => {
  await Review.destroy({ where: { id: req.params.id } })
    .then((data) => {
      if (data == 1) {
        res.send({ message: "Review deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete Review with id=${req.params.id}. Maybe Review was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `An error ocurred while trying to delete review with id of ${req.params.id}`,
      });
    });
};

const validateUpdate = (data) => {
  const errors = [];

  // Validate the status field
  const validStatuses = ["in-review", "completed"];
  if (data.status && !validStatuses.includes(data.status)) {
    errors.push(
      `status is required and must be one of the following: ${validStatuses.join(
        ", "
      )}.`
    );
  }

  // Validate the summary field
  if (data.summary && typeof data.summary !== "string") {
    errors.push("summary must be a string.");
  }

  if (data.reviewId && typeof data.reviewId !== "number") {
    errors.push("reviewId must be a number");
  }

  // Return validation results
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true };
};
// router.post("/resume/:resumeId/review", [authenticate], review.create);

// router.put("/resume/:resumeId/review/:id", [authenticate], review.update);

// router.delete("/resume/:resumeId/review/:id", [authenticate], review.destroy);
