module.exports = (sequelize, DataTypes) => {
  const Invoice_Product = sequelize.define(
    "Invoice_Product",
    {
      invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "invoice",
          key: "invoice_id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "product",
          key: "product_id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: true,
      },
    },
    {
      tableName: "Invoice_Product",
      timestamps: false,
    }
  );
  Invoice_Product.associate = (models) => {
    Invoice_Product.belongsTo(models.Invoice, {
      foreignKey: "invoice_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Invoice_Product.belongsTo(models.Product, {
      foreignKey: "product_id",
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };

  return Invoice_Product;
};
