module.exports = (app) => {
  const review = require("../controllers/review.controller.js");
  const {
    authenticate,
    isAdmin,
  } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/resume/:resumeId/review", [authenticate], review.getAll);

  router.get("/resume/review/:id", [authenticate, isAdmin], review.getForId);

  router.post(
    "/resume/:resumeId/review",
    [authenticate, isAdmin],
    review.create
  );

  router.put("/resume/review/:id", [authenticate, isAdmin], review.update);

  router.delete("/resume/review/:id", [authenticate, isAdmin], review.destroy);

  app.use("/resume-t1/student", router);
};
