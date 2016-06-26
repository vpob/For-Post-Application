var express = require('express');
var app = express();
var mongojs = require('mongojs');
// var db = mongojs('posts', ['postlist']);
var db = mongojs("mongodb://root:postlistroot@ds023714.mlab.com:23714/post-application",['postlist'])
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/postslist:arg', function(req, res){
	var arg = req.params.arg;

	(arg == 2) ? randomLists() : byDate(arg);

	function byDate(arg){
		(arg > 0) ? arg = {date: +1} : arg = {date: -1};

			db.postlist.find().sort(arg, function(err, docs){
				res.json(docs);
			});
	};

	function randomLists(){
		db.postlist.count({}, function(error, numOfPost) {
					db.postlist.aggregate(
					   { $sample: { size: numOfPost } }
					,function(err, docs){
						res.json(docs);
					})
		});
	};
});

app.post('/postslist', function(req, res){

	req.body.date = new Date();

	db.postlist.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.listen(process.env.PORT || 3000, function (err) {
	if(!err)
  console.log('listening on port 3000!');
});