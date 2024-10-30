module.exports = (app) => {
  const education = require("../controllers/education.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/student/education", [authenticate], education.getAllForUser);

  router.get("/student/education/:id", [authenticate], education.getForId);

  router.post("/student/education/", [authenticate], education.create);

  router.put("/student/education/:id", [authenticate], education.update);

  router.delete("/student/education/:id", [authenticate], education.delete);

  app.use("/resume-t1", router);
};
