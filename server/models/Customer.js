module.exports = (Sequelize, DataTypes) => {
  const Customer = Sequelize.define("Customer", {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    mobile_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Users;
};
