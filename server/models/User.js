// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     "User",
//     {
//       user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       user_name: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//       },
//       role: {
//         type: DataTypes.STRING(45),
//         allowNull: false,
//       },
//       password: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//       email: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//       },
//       status: {
//         type: DataTypes.STRING(45),
//         allowNull: false,
//       },
//     },
//     {
//       tableName: "User",
//       timestamps: false,
//     }
//   );

//   return User;
// };

module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define("User", {
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

    address: {
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

    user_role: {
      type: DataTypes.ENUM("storekeeper", "cashier", "admin"),
      allowNull: false,
    },

    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // token: {
    //   type: DataTypes.STRING,
    //   required: true,
    // },

    // verifytoken: {
    //   type: DataTypes.STRING,
    // },
  });

  return User;
};
