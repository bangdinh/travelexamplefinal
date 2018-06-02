var db = require('../dbconnection');

var contents={
	getAllContent:function(callback){
		return db.query("Select * from content",callback);
	},
	getContentById:function(b100,callback){
		return db.query("select * from content ct,business bs where ct.b100=? and ct.b100 = bs.b100",[b100],callback);
	},
	addContent:function(content,callback){
		return db.query("Insert into content(b100,cd101,ci102,cv103,cv104) values(?,?,?,?,?)",[content.b100,content.cd101,content.ci102,content.cv103,content.cv104],callback);
	},
	deleteContent:function(id,callback){
		return db.query("delete from content where content_id=?",[id],callback);
	},
	updateContent:function(id,content,callback){
		return db.query("update content set b100 =?,cd101=?,ci102=?,cv103=?,cv104=?where content_id=?",[content.b100,content.cd101,content.ci102,content.cv103,content.cv104,id],callback);
	},
	getListContentById:function(b100,callback){
		return db.query("select * from content where b100=?",[b100],callback);
	}
};
 module.exports=contents;