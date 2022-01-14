module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('ticket', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    price: DataTypes.INTEGER,
    routeId: DataTypes.INTEGER
  },
  {
    timestamps: false,
    freezeTableName: true
  });

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.seat)
  };

  return Ticket;
}
