module.exports = (Sequelize, DataTypes) => {
  const Users = Sequelize.define("Users", {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    mobile_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    user_role: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Users;
};
