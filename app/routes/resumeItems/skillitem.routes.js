module.exports = (app) => {
    const skillItem = require("../../controllers/resumeItems/skillitem.controller.js");
    const { authenticate } = require("../../authorization/authorization.js");
  
    const router = require("express").Router();
  
    // Create a new SkillItem
    router.post("/", [authenticate], skillItem.create);
  
    // Retrieve all SkillItems
    router.get("/", [authenticate], skillItem.findAll);
  
    // Retrieve a single SkillItem with id
    router.get("/:id", [authenticate], skillItem.findOne);
  
    // Update a SkillItem with id
    router.put("/:id", [authenticate], skillItem.update);
  
    // Delete a SkillItem with id
    router.delete("/:id", [authenticate], skillItem.delete);
  
    app.use("/resume-t1/student/skill-item", router);
  };
  