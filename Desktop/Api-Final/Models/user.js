var db = require('../dbconnection');

var user={
	getAllUser:function(callback){
		return db.query("Select * from users",callback);
	},
	getUserById:function(mail,pass,callback){//login
		return db.query("select * from users where mail=? and pass=? ",[mail,pass],callback);
	},
	addUser:function(user,callback){//thêm 1 user lúc đăng kí???(chưa xác định)
		return db.query("Insert into users(mail,pass,uv101,uc103,ud104,uc105,uv106,bv101,bv102,bc103,bv104,ub100) values(?,?,?,?,?,?,?,?,?,?,?,?)",
			[user.mail,user.pass,user.uv101,user.uc103,user.ud104,user.uc105,user.uv106,user.bv101,user.bv102,user.bc103,user.bv104,user.ub100],callback);
	},
	deleteUser:function(id,callback){
		return db.query("delete from users where u100=?",[id],callback);
	},
	updateUser:function(id,user,callback){//cập nhật thông tin user trong profile
		return db.query("update users set pass=?,uv101=?,uc103=?,ud104=?,uc105=?,uv106=? where u100=?",[user.pass,user.uv101,user.uc103,user.ud104,user.uc105,user.uv106,id],callback);
	},
	getUserFilterById:function(id,callback){//lấy danh sách user đăng kí là doanh nghiệp
		return db.query("select * from users where ub100=?",[id],callback);
	},
	updateUserRegisterBusiness:function(id,user,callback){//cập nhật thông tin user đăng kí doanh nghiệp - xét duyệt - hủy
		return db.query("update users set uc105=?,bv101=?,bv102=?,bv104=?,bc103=?,latitude=?,longitude=?,address=?,ub100=? where u100=?",
			[user.uc105,user.bv101,user.bv102,user.bv104,user.bc103,user.latitude,user.longitude,user.address,user.ub100,id],callback);
	},
	addRegisterUser:function(user,callback){//đăng kí 1 account
		// return db.query("Insert into users(mail,pass) values(?,?)",[user.mail,user.pass],callback);
		return db.query("Insert into users(mail,pass,uc103,uc105,ub100) values(?,?,?,?,?)",[user.mail,user.pass,user.uc103,user.uc105,user.ub100],callback);
	},
	updateAdminUser:function(id,user,callback){//thêm tài khoản là admin
		return db.query("update users set uc105=?,adlevel=? where u100=?",[user.uc105,user.adlevel,id],callback);
	},
	updateAcceptBusiness:function(id,user,callback){//Khi accept thì thay đổi key
		return db.query("update users set uc105=?,ub100='ACCEPT' where u100=?",[user.uc105,id],callback);
	},
	updateUserRegister:function(b100,callback){//cập nhật thông tin user đăng kí doanh nghiệp - xét duyệt - hủy
		return db.query("update users set bv101=?,bv102=?,bv104=?,bc103=?,latitude=?,longitude=?,address=?,ub100=? where u100=?",
						[b100.bv101,b100.bv102,b100.bv104,b100.categories_id,b100.latitude,b100.longitude,b100.address,b100.ub100,b100.b100],callback);
	}

	// mail		VARCHAR(30)		NOT NULL,
 //    pass		VARCHAR(20)		NOT NULL,
 //    uv101  VARCHAR(14)     NOT NULL, 
 //    uc103      ENUM ('M','F')  NOT NULL,
 //    ud104  DATE            NOT NULL,
 //    uc105    ENUM('A','B','V') NOT NULL,
 //    uv106 
};
 module.exports=user;