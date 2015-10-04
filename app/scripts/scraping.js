var express = require('express'),
	fs = require('fs'),
	request = require('request'),
	cheerio = require('cheerio'),
	Firebase = require('firebase'),
	app = express();


app.get('/scrape', function(req, res) {
	res.send('Hello world');

	var url = "http://www.altomfotball.no/element.do?cmd=tournament&tournamentId=230&useFullUrl=false";

	request(url, function(error, response, html) {
		if(!error) {
			var $ = cheerio.load(html);

			var homeTeam, awayTeam, time;
			
			var matchJson = {
						homeTeam: "",
						awayTeam: "",
						time: ""
				};

			var matches = [];

			var ref = new Firebase("https://draktoversikt.firebaseio.com/nextMatches");

			$('#sd_fixtures_table_next tbody tr').filter(function() {
				matchJson = {
						homeTeam: "",
						awayTeam: "",
						time: ""
					};
				
				var data = $(this);

				console.log("Hjemmelag");
				matchJson.homeTeam = data.children().children()[3].children[0].data;
				console.log("Bortelag");
				matchJson.time = data.children().children()[4].children[0].data;
				matchJson.awayTeam = data.children().children()[5].children[0].data;

				matches.push(matchJson);
				ref.push(matchJson);			
			});

			
		}
		console.log(matches);
		fs.writeFile('output.json', JSON.stringify(matches, null, 4), function(err) {
			console.log('File was written');
		})
	})

});

app.listen('8081');

console.log('App running on port 8081');

exports = module.exports = app;