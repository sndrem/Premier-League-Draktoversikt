var express = require('express'),
	fs = require('fs'),
	request = require('request'),
	cheerio = require('cheerio'),
	Firebase = require('firebase'),
	app = express();

	var altomfotball = "altomfotball.no/";
	var url = "http://www.altomfotball.no/element.do?cmd=tournament&tournamentId=230&useFullUrl=false";
	var ref = new Firebase("https://draktoversikt.firebaseio.com");
	ref.child('nextMatches').remove();

	request(url, function(error, response, html) {
		if(!error) {
			var $ = cheerio.load(html);

			var homeTeam, awayTeam, time;

			var matchJson = {};

			var matches = [];

			var todaysDate = new Date();
			console.log(todaysDate);

			ref.child('date').set({
				dateUpdated: todaysDate.getTime()
			});


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
						league: "",
						matchUrl: ""
					};

				var data = $(this);

				matchJson.date = data.children().children()[0].children[0].data.replace(/\s/g,' ');;
				matchJson.round = data.children().children()[1].children[0].data.replace(/\s/g,' ');;
				matchJson.league = data.children().children()[2].children[0].data.replace(/\s/g,' ');;

				try {

					matchJson.channel = data.children().children()[6].children[0].data.replace(/\s/g,' ');
				} catch (err) {

				}


				matchJson.homeTeam.name = data.children().children()[3].children[0].data.replace(/\s/g,' ');;
				matchJson.homeTeam.priority = 1;

				matchJson.time = data.children().children()[4].children[0].data;
				// matchJson.matchUrl = data.children().children()[4].children[0].data;
				matchJson.matchUrl = altomfotball + data.children().children()[4].children[0].parent.attribs.href;
				

				matchJson.awayTeam.name = data.children().children()[5].children[0].data.replace(/\s/g,' ');
				matchJson.awayTeam.priority = 2;

				matches.push(matchJson);
				ref.child('nextMatches').push(matchJson, function(err) {
					// Når vi har pushet alle kampene, avslutt scriptet
					process.exit();
				});
			});
		}
		fs.writeFile('output.json', JSON.stringify(matches, null, 4), function(err) {
		console.log('File was written');


		})
	console.log(matches.length + ' kamper ble lagret i databasen');

	})



