var db = require('../dbconnection');

var business={
	getAllBusiness:function(callback){
		return db.query("Select * from business bs,categories cg where bs.ub100 = 'ACCEPT' and bs.categories_id = cg.c100",callback);
	},
	getFilterBusiness:function(c100,callback){
		return db.query("Select * from business bs,categories cg  where bs.categories_id =?and ub100 = 'ACCEPT' and bs.categories_id = cg.c100",[c100],callback);
	},
	getBusinessById:function(u100,callback){
		return db.query("select * from business where fu100=?",[u100],callback);
	},
	addBusiness:function(business,callback){
		return db.query("Insert into business(b100,fu100,bv101,bv102,bv104,bf105,bi106,bv107,categories_id,latitude,longitude,address,ub100) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",
			[business.b100,business.fu100,business.bv101,business.bv102,business.bv104,business.bf105,business.bi106,business.bv107,business.categories_id,business.latitude,business.longitude,business.address,business.ub100],callback);
	},
	deleteBusiness:function(b100,callback){
		return db.query("delete from business where b100=?",[b100],callback);
	},
	updateBusiness:function(id,business,callback){
		return db.query("update business set bv101=?,bv102=?,bc103=?,bv104=?,bf105=?,bi106=?,bv107=?,categories_id=?,latitude=?,longitude=?,address=? where b100=?",
			[business.bv101,business.bv102,business.bc103,business.bv104,business.bf105,business.bi106,business.bv107,business.categories_id,business.latitude,business.longitude,business.address,id],callback);
	},
	updateImageCoverBusiness:function(id,business,callback){
		return db.query("update business set bv107=? where b100=?",[business.bv107,id],callback);
	},
	updateAcceptBusiness:function(id,callback){
		return db.query("update business set ub100='ACCEPT' where b100=?",[id],callback);
	},
	updateBackgroundBusiness:function(id,b100,callback){
		return db.query("update business set bv108=? where b100=?",[b100.bv108,id],callback);
	},
	updateNameBusiness:function(id,b100,callback){
		return db.query("update business set bv101=? where b100=?",[b100.bv101,id],callback);
	},
	updateAvatarBusiness:function(id,b100,callback){
		return db.query("update business set bv104=? where b100=?",[b100.bv104,id],callback);
	}
	
/*
b100: priamry key
fu100: foreign key(users)
bv101: name business
bv102: number of register business
bc103 : type business (travel,restaurant,shopping)
bv104: avartar
bf105: rating
bi106: distance
bv107: background

*/
};
 module.exports=business;