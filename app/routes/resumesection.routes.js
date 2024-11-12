module.exports = (app) => {
  const resumeSection = require("../controllers/resume.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/resume/:id", [authenticate], resume.getForId);

  router.post("/resume/", [authenticate], resume.create);

  router.put("/resume/:id", [authenticate], resume.update);

  router.delete("/resume/:id", [authenticate], resume.delete);

  app.use("/resume-t1/student", router);
};
