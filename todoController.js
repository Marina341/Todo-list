var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://test:test@ds147072.mlab.com:47072/organize');

var todoSchema = new mongoose.Schema({
        item: String
    });

var Todo = mongoose.model('Todo', todoSchema);

    
//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {
	app.get('/todo', function (req, res) {
        Todo.find({}, function (err, data) {
           if (err) throw err;
            res.render('todo', {todos: data});
        });
	});

	app.post('/todo', urlencodedParser, function (req, res) {
        var newTodo = Todo(req.body).save(function (err, data){
           if (err) throw err; 
            res.json(data);
        });
	});
	
	app.delete('/todo/:item', function (req, res){ //:item is url item
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err,data){
            if (err) throw err;
            res.json(data);
        });
	});
}