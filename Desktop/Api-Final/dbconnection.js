var mysql=require('mysql');
var connection=mysql.createPool({
 
  host: "118.69.184.56",
  user: "bangdx",
  password: "Ftel@123!@",
  database: "dbMySqlTravel"
 
});
module.exports=connection;