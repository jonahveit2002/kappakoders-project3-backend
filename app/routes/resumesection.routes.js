module.exports = (app) => {
  const resumeSection = require("../controllers/resumesection.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Get all resume sections for a specific resume
  router.get(
    "/:resumeId/resumeSection",
    [authenticate],
    resumeSection.getAllForUser // Should be updated to fit the logic of "getAllForResumeId" in the controller
  );

  // Create a new resume section for a specific resume
  router.post(
    "/:resumeId/resumeSection",
    [authenticate],
    resumeSection.create
  );

  // Update a specific resume section by ID
  router.put(
    "/:resumeId/resumeSection/:id",
    [authenticate],
    resumeSection.update
  );

  // Delete a specific resume section by ID
  router.delete(
    "/:resumeId/resumeSection/:id",
    [authenticate],
    resumeSection.delete
  );

  app.use("/resume-t1/student/resume", router);
};
