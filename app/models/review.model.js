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
      default: "in-review",
    },
    summary: {
      type: Sequelize.TEXT("long"),
      allowNull: true,
    },
    completedBy: {
      type: Sequelize.STRING,
    },
  });

  return Review;
};
