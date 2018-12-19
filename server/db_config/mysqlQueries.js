const mysql = require("mysql");
let db_config = {
    host: '35.197.132.215',
    user: 'root',
    password: 'MEw9f.YL'
};
function sqlQuery(database, query, callback)
{
  let connection = mysql.createConnection(db_config);
  connection.connect(function(connection_err)
  {
    if(connection_err)
    {
      console.log('error when connecting to db:', connection_err);
    }
    else
    {
      connection.query("use "+database);
      connection.query(query,function(err,result)
      {
          if(!err)
            callback(result);
          else
          {
            console.log(err)
          }
      }.bind(this));
    }
    connection.end();
  });
}
module.exports = {
  sqlQuery : sqlQuery
};