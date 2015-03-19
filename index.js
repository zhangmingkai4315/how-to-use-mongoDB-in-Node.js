// var mongo=require('mongodb');
// var host="localhost";
// var port=27017;
// var db=new mongo.Db('node-mongo-examples',new 
// 	mongo.Server(host,port,{}),{});
// 	db.open(function(err,db){
// 		db.collection('users',function(err,collection){
// 			collection.insert({username:'Bilbo',firstName:'Shilbo'},function(err,docs){
// 				console.log(docs);
// 				db.close();
// 			});
// 		});
// 	});

//for details : please visit http://mongoosejs.com/docs/guide.html

var mongoose=require('mongoose');

var db=mongoose.connect('mongodb://localhost:27017/NodeJsTest',function(err){
	if(err){
		console.log('Could not connect to mongo');
	}
});

var Schema=mongoose.Schema;
var ObjectId=Schema.ObjectId;

var AuthorSchema=new Schema({
	username:{type:String,default:'匿名用户'},
	title:{type:String},
	content:String,
	Photo:String
});


AuthorSchema.methods.findByusername=function(username,callback){
	return this.model('mongoose').find({username:username},callback);
};
AuthorSchema.statics.findByTitle=function(title,callback){
	return this.model('mongoose').find({title:title},callback);
};


var Author=db.model('Author',AuthorSchema);

var doc={username:'mike',title:'hello world',content:"this is a test content",Photo:'/1.jpg'};

var oneAuthor=new Author(doc);
oneAuthor.save(function(err){
	if(err) 
		console.log("Can't save it!");
	else 
		console.log('Save it!');
});






