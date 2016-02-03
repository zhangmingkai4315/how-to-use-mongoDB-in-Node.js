var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var userSchema=Schema({
	name:String,
	age:Number,
	posts:[{type:Schema.ObjectId,ref:'Post'}]
});
var postSchema=Schema({
	_creator:{type:Schema.ObjectId,ref:'User'},
	title:String,
	text:String,
	like: [{ type: Schema.ObjectId, ref: 'User' }]
});

var Post=mongoose.model('Post',postSchema);
var User=mongoose.model('User',userSchema);



var dbconnect=mongoose.connect('mongodb://localhost/TestPersons', function(err) {
  if (err) throw err;

	var user1=new User({
		name:'Mike',age:21
	});
	var user2=new User({
		name:'Alice',
		age:25
	});
	var user3=new User({
		name:"Bob",
		age:30
	});
	var post1=new Post({
		title:"Learning react",
		_creator:user1._id,
		like:[user2._id,user3._id]
	});
	user1.posts.push(post1);
	user1.save(function(err){
		if(err) return err;
		post1.save(function(err){
			if(err) console.log(err);
			Post.findOne({title:/react/i})
				.populate('_creator')
				.exec(function(err,post){
					if(err) return err;
					console.log('The creator is %s',post._creator.name);
					var guille = new User({ name: 'Guillermo',age:20});
						guille.save(function (err) {
						  if (err) return err;

						  post._creator = guille; // or guille._id

						  post.save(function (err) {
						    if (err) return err;

						    Post
						    .findOne({ title: /react/i })
						    .populate('_creator', 'name')
						    .exec(function (err, story) {
						      if (err) return err

						      console.log('The creator is %s', story._creator.name)
						  	 mongoose.disconnect();
						      // prints "The creator is Guillermo"
						    })

						  })
						})
				})
		});
	});
});
