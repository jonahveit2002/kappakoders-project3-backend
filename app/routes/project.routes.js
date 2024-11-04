module.exports = (app) => {
  const project = require("../controllers/project.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/project", [authenticate], project.getAllForUser);

  router.get("/project/:id", [authenticate], project.getForId);

  router.post("/project/", [authenticate], project.create);

  router.put("/project/:id", [authenticate], project.update);

  router.delete("/project/:id", [authenticate], project.delete);

  app.use("/resume-t1/student", router);
};
