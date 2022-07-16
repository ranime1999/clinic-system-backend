module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define("patient", {
    FN: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    }
  });

  return Patient;
};
