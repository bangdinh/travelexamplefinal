var db = require('../dbconnection');

var background={
	getAllBackgroundById:function(id,callback){
		return db.query("Select * from background where b100=?",[id],callback);
	},
	UpdateBackground:function(id,bg,callback){
		return db.query("update background set img = ? where bg100=?",[bg.img,id],callback);
	},
	createbackground:function(bg,callback){
		return db.query("Insert into background(b100,img) values(?,?)",[bg.b100,bg.img],callback);
	}
};
 module.exports=background;