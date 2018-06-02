var db = require('../dbconnection');

var feedback={
	getAllFeedBack:function(callback){
		return db.query("Select * from feedback fb,users us,business bs where fb.u100 = us.u100 and fb.b100 = bs.b100",callback);
	},
	getFeedBackById:function(b100,callback){
		return db.query("Select * from feedback fb inner join users us on fb.u100 = us.u100 where fb.b100 =?",[b100],callback);
	},
	addFeedBack:function(feedback,callback){
		return db.query("Insert into feedback(u100,b100,fv101,fi102,fd103) values(?,?,?,?,?)",[feedback.u100,feedback.b100,feedback.fv101,feedback.fi102,feedback.fd103],callback);
	},
	deleteFeedBack:function(id,callback){
		return db.query("delete from feedback where f100=?",[id],callback);
	},
	updateFeedBack:function(id,feedback,callback){
		return db.query("update feedback set fv101=?,fi102=?,fd103=? where f100=?",[feedback.fv101,feedback.fi102,feedback.fd103,id],callback);
	},
	getTBSao:function(b100,callback){
		return db.query("select avg(fi102) as count from feedback where b100=?",[b100],callback);
	}
};
	/*
SELECT column-names
  FROM table-name1 INNER JOIN table-name2 
    ON column-name1 = column-name2
 WHERE condition

	f100 int not null auto_increment,
u100 int not null,
b100 int not null,
fv101 nvarchar(1000) not null,
fi102 int not null,
fd103 date not null,
	*/
 module.exports=feedback;