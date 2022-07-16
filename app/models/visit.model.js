module.exports = (sequelize, Sequelize) => {
    const Visit = sequelize.define("visit", {
      date: {
        type: Sequelize.DATEONLY
      },
      treatment: {
        type: Sequelize.STRING
      },
      amount_paid: {
        type: Sequelize.INTEGER
      }
    });

    return Visit;
  };

  