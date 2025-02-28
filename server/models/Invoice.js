module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    "Invoice",
    {
      invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "user_id",
          onDelete: "no action",
          onUpdate: "CASCADE",
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("current_timestamp"),
      },
      total: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false,
        defaultValue: 0,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      charge_id:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "cash",
      }
    },
    {
      tableName: "invoice",
      timestamps: false,
    }
  );
  Invoice.associate = (models) => {
    Invoice.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Invoice;
};
