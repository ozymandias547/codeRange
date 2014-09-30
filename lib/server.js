var express = require('express'),
	app = express(),
	swig = require('swig'),
	challenges = require("../data/challenges.json");

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', 'public/views');

app.get('/', function (req, res) {

	var model = {};

	// reorganzie the data as categories.
	challenges.forEach(function(challenge) {
		
		var cat = challenge.category;

		if (!model[cat])
			model[cat] = [];
			
		model[cat].push({
            name: challenge.name,
            category: challenge.category,
            url: "/challenge/" + challenge.name.replace(/\s/g, "").toLowerCase()
        });
		
	});


  	res.render("index", { model: model });

});

app.get('/challenge/:name', function (req, res) {

    var model = challenges.filter(function(challenge) {
       return challenge.name.replace(/\s/g, "").toLowerCase() === req.params.name;
    });

    model = model[0];

    if (model) {
    	res.render("challenge", {model: model});
    } else {
    	res.render("404");
    }

});


app.use(express.static('public'));

app.listen(process.env.PORT || 3000, function() {
	console.log('Listening on port %d', process.env.PORT || 3000);
});