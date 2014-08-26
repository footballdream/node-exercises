module.exports = function(sequelize, DataTypes) {
  var Sentence = sequelize.define('Sentence', {
    english: DataTypes.STRING,
    chinese: DataTypes.STRING
  }, {
    classMethods: {}
    }
  );
  return Sentence;
}
