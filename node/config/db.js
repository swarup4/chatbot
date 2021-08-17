const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize('chatapp', 'root', 'root@123', {
  host: 'localhost',
  dialect: 'mysql'
});

const connectionObj = {
  connectionString: sequelize,
  connect: function(callback){
    const obj = {};
    sequelize.authenticate().then(() => {
      console.log('Database Connection has been established successfully.');
      obj.code = 200;
      obj.message = "Success";
      callback(obj);
    }).catch(err => {
      console.error('Unable to connect to the database:', err);
      callback(err);
    });
  }
  
}
module.exports = connectionObj;