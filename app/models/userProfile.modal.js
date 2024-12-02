// models/UserProfile.js

module.exports = (sequelize, Sequelize) => {
    const UserProfile = sequelize.define('UserProfile', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNum: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profilePhoto: {
        type: Sequelize.STRING,
        allowNull: true, // The photoUrl is optional
      },
    });

    return UserProfile;
  };
  