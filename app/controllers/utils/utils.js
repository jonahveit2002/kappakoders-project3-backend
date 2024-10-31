const db = require("../models");
const Session = db.session;

exports.getUserId = async (req) => {
  let token = null;
  let authHeader = req.get("authorization");
  token = authHeader.slice(7);

  const session = await Session.findOne({ where: { token: token } });

  return session.userId;
};
