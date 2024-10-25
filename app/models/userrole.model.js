module.exports = (sequelize, Sequelize) => {
  const UserRole = sequelize.define("userRole", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });

  return UserRole;
};
