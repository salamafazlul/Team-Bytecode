module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define(
    "Discount",
    {
      discount_code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 1,
        },
        unique: "rate_UNIQUE",
      },
    },
    {
      tableName: "discount",
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ["discount_code"],
          name: "discount_code_UNIQUE",
        },
      ],
    }
  );

  return Discount;
};
