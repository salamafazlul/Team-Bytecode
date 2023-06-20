module.exports = (Sequelize, DataTypes) => {
  const Customers = Sequelize.define("Customers", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
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
      unique: true,
    },
  });

  return Customers;
};
