var db = require('../dbconnection');

var banner={
	getAllBanner:function(callback){
		return db.query("Select * from banner",callback);
	},
	addBanner:function(banner,callback){
		return db.query("Insert into banner(u100,img) values(?,?)",[banner.u100,banner.img],callback);
	},
	deleteBanner:function(id,callback){
		return db.query("delete from banner where _id100=?",[id],callback);
	},
	updateBanner:function(id,banner,callback){
		return db.query("update banner set img=? where _id100=?",[banner.img,id],callback);
	}
	/*_id100,u100,img*/
};
 module.exports=banner;