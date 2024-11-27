module.exports = (app) => {
  const professionalSummary = require("../controllers/professionalsummaries.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get(
    "/professionalSummary",
    [authenticate],
    professionalSummary.getAllForUser
  );

  router.get(
    "/professionalSummary/:id",
    [authenticate],
    professionalSummary.getForId
  );

  router.get(
    "/professionalSummary/resume/:resumeId",
    [authenticate],
    professionalSummary.getProfessionalSummaryForResume
  );

  router.post(
    "/professionalSummary/",
    [authenticate],
    professionalSummary.create
  );

  router.put(
    "/professionalSummary/:id",
    [authenticate],
    professionalSummary.update
  );

  router.delete(
    "/professionalSummary/:id",
    [authenticate],
    professionalSummary.delete
  );

  app.use("/resume-t1/student", router);
};
