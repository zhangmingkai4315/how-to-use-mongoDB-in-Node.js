var async = require('async');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PersonSchema = new Schema({
    name: String,
    age: Number,
    birthday: Date
  });

PersonSchema.pre('save',function(next){
	console.log('Will Save the Doc');
	return next();
});
PersonSchema.pre('remove',function(next){
	console.log('Will remove the Doc');
	return next();
});

PersonSchema.method({
	show:function(slog){
		console.log(slog+" : "+this.name+" : "+ this.age)
	}
});


var Person = mongoose.model('Person',PersonSchema);
var data = [
    {
      name: 'bill',
      age: 25,
      birthday : new Date().setFullYear((new Date().getFullYear() - 25))
    },
    {
      name: 'mary',
      age: 30,
      birthday: new Date().setFullYear((new Date().getFullYear() - 30))
    },
    {
      name: 'bob',
      age: 21,
      birthday : new Date().setFullYear((new Date().getFullYear() - 21))
    },
    {
      name: 'lilly',
      age: 26,
      birthday: new Date().setFullYear((new Date().getFullYear() - 26))
    },
    {
      name: 'alucard',
      age: 1000,
      birthday: new Date().setFullYear((new Date().getFullYear() - 1000))
    }
];


mongoose.connect('mongodb://localhost/TestPersons', function(err) {
  if (err) throw err;

  // create all of the dummy people
  async.each(data, function(item, cb) {
    Person.create(item, cb);
  }, function(err) {
    if (err) {
        console.log(err);
    }

    var prom = Person.find({age : { $lt : 1000 }}).exec();

      // add a callback on the promise. This will be called on both error and
      // complete
    prom.addBack(function() { console.log("completed"); });

      // add a callback that is only called on complete (success) events
    prom.addCallback(function() { console.log("Successful Completion!"); });
    prom.addErrback(function() { console.log("Fail Boat"); });
    prom.then(function(people) {

        // just getting the stuff for the next query
      var ids = people.map(function(p) {
        return p._id;
      });

        // return the next promise
      return Person.find({ _id : { $nin : ids }}).exec();
    }).then(function(oldest) {
      console.log("Oldest person is: %s", oldest);
      return Person.remove(oldest).exec();
    }).then(cleanup);
  });
});

function cleanup() {
 
    mongoose.disconnect();

}


