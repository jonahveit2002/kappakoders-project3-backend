module.exports = (app) => {
  const comment = require("../controllers/comment.controller.js");
  const {
    authenticate,
    isAdmin,
  } = require("../authorization/authorization.js");
  var router = require("express").Router();

  router.get(
    "/resume/review/:reviewId/comment",
    [authenticate],
    comment.getAll
  );

  router.post(
    "/admin/resume/review/:reviewId/comment",
    [authenticate, isAdmin],
    comment.create
  );

  router.put(
    "/admin/resume/review/comment/:id",
    [authenticate, isAdmin],
    comment.update
  );

  router.delete(
    "/admin/resume/review/comment/:id",
    [authenticate, isAdmin],
    comment.destroy
  );

  app.use("/resume-t1/", router);
};
