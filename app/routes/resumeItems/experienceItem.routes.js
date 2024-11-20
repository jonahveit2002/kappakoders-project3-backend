module.exports = (app) => {
    const experienceItem = require("../../controllers/resumeItems/experienceitem.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
  
    const router = require("express").Router();
  
    // Create a new ExperienceItem within a specific resume section
    router.post("/:resumeId/resumeSection/:sectionId/experience-item", authenticate, experienceItem.create);
  
    // Get all experience items for a specific section
    router.get("/:resumeId/resumeSection/:sectionId/experience-item", authenticate, experienceItem.findAll);
  
    // Get experience item by ID
    router.get("/:resumeId/resumeSection/:sectionId/experience-item/:item_id", authenticate, experienceItem.findOne);
  
    // Update a ExperienceItem by ID
    router.put("/:resumeId/resumeSection/:sectionId/experience-item/:item_id", authenticate, experienceItem.update);
  
    // Delete a ExperienceItem by ID
    router.delete("/:resumeId/resumeSection/:sectionId/experience-item/:item_id", authenticate, experienceItem.delete);
  
    app.use("/resume-t1/student/resume", router);
  };