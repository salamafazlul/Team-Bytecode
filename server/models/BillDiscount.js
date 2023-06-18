module.exports = (sequelize, DataTypes) => {
  const Bill_Discount = sequelize.define(
    "Bill_Discount",
    {
      billDiscount_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "bill_discount",
      timestamps: false,
    }
  );

  return Bill_Discount;
};
