var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connecting to database
mongoose.connect('mongodb+srv://Ishan:8630@cluster0-oik52.mongodb.net/test?retryWrites=true&w=majority');

//creating a schema (like a blue print of the database)
var todoSchema =new mongoose.Schema({
	item : String
});

//creating a model
var Todo = mongoose.model('Todo',todoSchema);


var urlencoderParser =bodyParser.urlencoded({ extended: false });

//var data = [{item : 'wake'},{item : 'Brush Teeth'}];




module.exports = function(app){

app.get('/todo',function(req,res){
	//get data from the mongo db and pass it to view
	Todo.find({},function(err,data){
		if(err) throw err;
		res.render('todo' , {todos : data});
	});
	
});

app.post('/todo',urlencoderParser,function(req,res){
	// to get data from the view and save it in mongo db
	var newtodo = Todo(req.body).save(function(err,data){
		if(err) throw err;
		res.json(data);
	});
});


app.delete('/todo/:item', function(req, res){
	//to delete the required data from the mongo db
	Todo.find({item : req.params.item.replace("-"," ")}).remove(function(err,data){
		if(err) throw err;
		res.json(data);
	});
});

};