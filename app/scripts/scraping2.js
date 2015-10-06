var express = require('express'),
	fs = require('fs'),
	request = require('request'),
	cheerio = require('cheerio'),
	Firebase = require('firebase'),
	app = express();


	var url = "http://www.altomfotball.no/element.do?cmd=tournament&tournamentId=230&useFullUrl=false";

	request(url, function(error, response, html) {
		if(!error) {
			var $ = cheerio.load(html);

			var homeTeam, awayTeam, time;
			
			var matchJson = {};

			var matches = [];

			var ref = new Firebase("https://draktoversikt.firebaseio.com/nextMatches");
			ref.remove();

			$('#sd_fixtures_table_next tbody tr').filter(function() {
				matchJson = {
						homeTeam: {
							name: "",
							priority: ""
						},
						awayTeam: {
							name: "",
							priority: ""
						},
						time: "",
						channel: "",
						round: "", 
						date: "",
						league: ""
					};
				
				var data = $(this);

				matchJson.date = data.children().children()[0].children[0].data.replace(/\s/g,' ');;
				matchJson.round = data.children().children()[1].children[0].data.replace(/\s/g,' ');;
				matchJson.league = data.children().children()[2].children[0].data.replace(/\s/g,' ');;
				// matchJson.channel = data.children().children()[6].data.replace(/\s/g,' ');;
				try {
					console.log(data.children().children()[6].children[0].data);	
					matchJson.channel = data.children().children()[6].children[0].data.replace(/\s/g,' ');
				} catch (err) {
					console.log(err);
				}
				
				
				matchJson.homeTeam.name = data.children().children()[3].children[0].data.replace(/\s/g,' ');;
				matchJson.homeTeam.priority = 1;
				
				matchJson.time = data.children().children()[4].children[0].data;

				matchJson.awayTeam.name = data.children().children()[5].children[0].data.replace(/\s/g,' ');
				matchJson.awayTeam.priority = 2;

				matches.push(matchJson);
				ref.push(matchJson);			
			});
		}
		fs.writeFile('output.json', JSON.stringify(matches, null, 4), function(err) {
			console.log('File was written');

		})
	console.log(matches.length + ' kamper ble lagret i databasen');
		
	})

