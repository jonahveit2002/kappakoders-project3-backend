module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNum: {
      type: Sequelize.STRING(10),
      allowNull: false,
    }
  
    //   type: Sequelize.STRING(512),
    //   allowNull: true
    // },
    // expiration_date: {
    //   type: Sequelize.DATE,
    //   allowNull: true
    // },
  });

  return User;
};
