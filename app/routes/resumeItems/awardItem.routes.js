module.exports = (app) => {
    const awardItem = require("../../controllers/resumeItems/awarditem.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
  
    const router = require("express").Router();
  
    // Create a new AwardItem within a specific resume section
    router.post("/:resumeId/resumeSection/:sectionId/award-item", authenticate, awardItem.create);
  
    // Get all award items for a specific section
    router.get("/:resumeId/resumeSection/:sectionId/award-item", authenticate, awardItem.findAll);
  
    // Get award item by ID
    router.get("/:resumeId/resumeSection/:sectionId/award-item/:item_id", authenticate, awardItem.findOne);
  
    // Update a AwardItem by ID
    router.put("/:resumeId/resumeSection/:sectionId/award-item/:item_id", authenticate, awardItem.update);
  
    // Delete a AwardItem by ID
    router.delete("/:resumeId/resumeSection/:sectionId/award-item/:item_id", authenticate, awardItem.delete);
  
    app.use("/resume-t1/student/resume", router);
  };