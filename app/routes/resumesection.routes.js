module.exports = (app) => {
  const resumeSection = require("../controllers/resumesection.controller.js");
  const {
    authenticate,
    isAdmin,
  } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Get all resume sections for a specific resume
  router.get(
    "/:resumeId/resumeSection",
    [authenticate],
    resumeSection.getAllForResume
  );

  router.get(
    "/:resumeId/resumeSection/comment/:reviewId",
    [authenticate, isAdmin],
    resumeSection.getAllForResumeWithCommentsForReview
  );

  // Get a specific resume section by ID
  router.get(
    "/:resumeId/resumeSection/:sectionId",
    [authenticate],
    resumeSection.getForId
  );

  // Create a new resume section for a specific resume
  router.post("/:resumeId/resumeSection", [authenticate], resumeSection.create);

  // Update a specific resume section by ID
  router.put(
    "/:resumeId/resumeSection/:sectionId",
    [authenticate],
    resumeSection.update
  );

  // Delete a specific resume section by ID
  router.delete(
    "/:resumeId/resumeSection/:section_id",
    [authenticate],
    resumeSection.delete
  );

  app.use("/resume-t1/student/resume", router);
};
