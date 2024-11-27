module.exports = (app) => {
  const professionalSummaryItem = require("../../controllers/resumeItems/professionalSummaryitem.controller.js");
  const { authenticate } = require("../../authorization/authorization.js");

  const router = require("express").Router();

  // Create a new ProfessionalSummaryItem within a specific resume section
  router.post(
    "/:resumeId/resumeSection/:sectionId/professionalSummary-item",
    authenticate,
    professionalSummaryItem.create
  );

  // Get all professionalSummary items for a specific section
  router.get(
    "/:resumeId/resumeSection/:sectionId/professionalSummary-item",
    authenticate,
    professionalSummaryItem.findAll
  );

  // Get professionalSummary item by ID
  router.get(
    "/:resumeId/resumeSection/:sectionId/professionalSummary-item/:item_id",
    authenticate,
    professionalSummaryItem.findOne
  );

  // Update a ProfessionalSummaryItem by ID
  router.put(
    "/:resumeId/resumeSection/:sectionId/professionalSummary-item/:item_id",
    authenticate,
    professionalSummaryItem.update
  );

  // Delete a ProfessionalSummaryItem by ID
  router.delete(
    "/:resumeId/resumeSection/:sectionId/professionalSummary-item/:item_id",
    authenticate,
    professionalSummaryItem.delete
  );

  app.use("/resume-t1/student/resume", router);
};
