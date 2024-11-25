module.exports = (app) => {
  const resume = require("../controllers/resume.controller.js");
  const { authenticate, isAdmin } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/student/resume/", [authenticate], resume.getAllForUser);

  router.get("/admin/resume/", [authenticate, isAdmin], resume.getAllForReview);
  
  router.get("/student/resume/:id", [authenticate], resume.getForId);

  router.post("/student/resume/", [authenticate], resume.create);

  router.put("/student/resume/:id", [authenticate], resume.update);

  router.delete("/student/resume/:id", [authenticate], resume.delete);

  app.use("/resume-t1/", router);
};
