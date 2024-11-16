module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("review", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: Sequelize.ENUM(["in-review", "completed"]),
      allowNull: false,
    },
    summary: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
  });

  return Review;
};
