var db = require('../dbconnection');

var categories={
	getAllCategories:function(callback){
		return db.query("Select * from categories",callback);
	},
	getCategoriesById:function(id,callback){
		return db.query("select * from categories where c100=?",[id],callback);
	},
	addCategories:function(categories,callback){
		return db.query("Insert into categories(ctype,cname) values(?,?)",[categories.ctype,categories.cname],callback);
	},
	deleteCategories:function(id,callback){
		return db.query("delete from categories where c100=?",[id],callback);
	},
	updateCategories:function(id,categories,callback){
		return db.query("update categories set ctype=?,cname=?where c100=?",[categories.ctype,categories.cname,id],callback);
	}
};
/*c100 - ctype,cname*/
 module.exports=categories;