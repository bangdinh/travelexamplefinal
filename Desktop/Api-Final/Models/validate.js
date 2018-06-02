var user = require('./Models/user');
function 	(mail){
	user.checkUserExits(mail,function(err, rows, fields) {
    if (err) throw err;
    done(rows[0]);
  });
}