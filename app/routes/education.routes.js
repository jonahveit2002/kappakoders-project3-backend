module.exports = (app) => {
  const education = require("../controllers/education.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/education", [authenticate], education.getAllForUser);

  router.get("/education/:id", [authenticate], education.getForId);

  router.post("/education/", [authenticate], education.create);

  router.put("/education/:id", [authenticate], education.update);

  router.delete("/education/:id", [authenticate], education.delete);

  app.use("/resume-t1/student", router);
};
