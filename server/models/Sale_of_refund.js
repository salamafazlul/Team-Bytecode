module.exports = (sequelize, DataTypes) => {
  const Sale_of_Refund = sequelize.define(
    "Sale_of_Refund",
    {
      refund_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Invoice",
          key: "invoice_id",
          onDelete: "no action",
          onUpdate: "no action",
        },
      },
      sale_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Invoice",
          key: "invoice_id",
          onDelete: "no action",
          onUpdate: "no action",
        },
      },
      
    },
    {
      tableName: "sale_of_refund",
      timestamps: false,
    }
  );

  Sale_of_Refund.associate = (models) => {
    Sale_of_Refund.belongsTo(models.Invoice, { foreignKey: "sale_id" });
    Sale_of_Refund.belongsTo(models.Invoice, { foreignKey: "refund_id" });
  };

  return Sale_of_Refund;
};
