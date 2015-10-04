var express = require('express'),
	fs = require('fs'),
	request = require('request'),
	cheerio = require('cheerio'),
	app = express();


app.get('/scrape', function(req, res) {
	res.send('Hello world');

	var url = "http://www.altomfotball.no/element.do?cmd=tournament&tournamentId=230&useFullUrl=false";

	request(url, function(error, response, html) {
		if(!error) {
			var $ = cheerio.load(html);

			var homeTeam, awayTeam, clock;
			var matchJson = {
				homeTeam: "",
				awayTeam: "",
				clock: ""
			};

			$('#sd_fixtures_table_next tbody tr').filter(function() {
				var data = $(this);

				$('td').attr('sd_fixtures_home');
				

			});
		}
	})

});

app.listen('8081');

console.log('App running on port 8081');

exports = module.exports = app;