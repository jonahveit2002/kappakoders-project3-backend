module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: Sequelize.TEXT("long"),
      allowNull: false,
    },
  });

  return Comment;
};
