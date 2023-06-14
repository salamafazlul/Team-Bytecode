module.exports = (sequelize, DataTypes) => {
    const Customers = sequelize.define(
      "Customers",
      {
        mobile_no: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        full_name: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(45),
          allowNull: false,
          unique: true,
        },
      },
      {
        tableName: "customer",
        timestamps: false,
      }
    );
  
    return Customers;
  };
  