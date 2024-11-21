module.exports = (app) => {
  const projectItem = require("../../controllers/resumeItems/projectitem.controller.js");
  const { authenticate } = require("../../authorization/authorization.js");

  const router = require("express").Router();

  // Create a new ProjectItem within a specific resume section
  router.post("/:resumeId/resumeSection/:sectionId/project-item", authenticate, projectItem.create);

  // Get all project items for a specific section
  router.get("/:resumeId/resumeSection/:sectionId/project-item", authenticate, projectItem.findAll);

  // Get project item by ID
  router.get("/:resumeId/resumeSection/:sectionId/project-item/:item_id", authenticate, projectItem.findOne);

  // Update a ProjectItem by ID
  router.put("/:resumeId/resumeSection/:sectionId/project-item/:item_id", authenticate, projectItem.update);

  // Delete a ProjectItem by ID
  router.delete("/:resumeId/resumeSection/:sectionId/project-item/:item_id", authenticate, projectItem.delete);

  app.use("/resume-t1/student/resume", router);
};