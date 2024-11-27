module.exports = (app) => {
  const review = require("../controllers/review.controller.js");
  const {
    authenticate,
    isAdmin,
  } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get("/student/resume/:resumeId/review", [authenticate], review.getAll);

  router.get(
    "/admin/resume/review/:id",
    [authenticate, isAdmin],
    review.getForId
  );

  router.post(
    "/student/resume/:resumeId/review",
    [authenticate],
    review.startReview
  );

  router.put(
    "/admin/resume/review/:id",
    [authenticate, isAdmin],
    review.update
  );

  router.delete(
    "/admin/resume/review/:id",
    [authenticate, isAdmin],
    review.destroy
  );

  app.use("/resume-t1", router);
};
