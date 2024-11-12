module.exports = (app) => {
  const resumeSection = require("../controllers/resumesection.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get(
    "/resume/:resumeId/resumeSection",
    [authenticate],
    resumeSection.getAllForResumeId
  );

  router.post(
    "/resume/:resumeId/resumeSection",
    [authenticate],
    resumeSection.create
  );

  router.put(
    "/resume/:resumeId/resumeSection",
    [authenticate],
    resumeSection.update
  );

  router.delete(
    "/resume/:resumeId/resumeSection",
    [authenticate],
    resumeSection.delete
  );

  app.use("/resume-t1/student", router);
};
