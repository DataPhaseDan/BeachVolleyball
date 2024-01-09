import * as fs from 'fs';
import ax from 'axios'; 
const axios = ax.create({
	baseURL: "https://fivb.org/vis2009",
});

axios
	.get("/XmlRequest.asmx", {
		params: {
			Request: `<Requests><Request Type='GetBeachMatchList' 
    Fields='No NoTournament NoInTournament LocalDate LocalTime 
    TeamAFederationCode TeamBFederationCode noTeamA TeamAName 
    noTeamB TeamBName Court MatchPointsA MatchPointsB 
    PointsTeamASet1 PointsTeamBSet1 PointsTeamASet2 
       PointsTeamBSet2 PointsTeamASet3 PointsTeamBSet3 
    DurationSet1 DurationSet2 DurationSet3'><Filter FirstDate='2023-11-30' InMainDraw='true'/>
    </Request></Requests>`,
		},
	})
	.then((response) => {
		// biome-ignore lint/complexity/noForEach: <explanation>
		response.data.responses.forEach((element) => {
			element.data = element.data.filter(
				(item) => item.noTeamA !== 0 && item.noTeamB !== 0,
			);
		});
		return response.data.responses;
	})
	.then((filteredData) => {
		fs.writeFile(
			"/usr/local/beach_volley_ball/db_fill/json/beachmatchlist.json",
			JSON.stringify(filteredData, null, 2),
			"utf8",
			(err) => {
				if (err) throw err;

				console.log("The file beachmatchlist.json has been saved!");
				getTournamentData();
			},
		);
	})
	.catch((error) => {
		console.error(error);
	});

async function getTournamentData() {
	const beachmatchlist = JSON.parse(
		fs.readFileSync(
			"/usr/local/beach_volley_ball/db_fill/json/beachmatchlist.json",
			"utf8",
		),
	);

	// Extract the distinct tournament numbers
	const tournamentNos = [
		...new Set(beachmatchlist[0].data.map((match) => match.noTournament)),
	];

	const existingData = [];
	for (const tournamentNo of tournamentNos) {
		try {
			const response = await axios.get("/XmlRequest.asmx", {
				params: {
					Request: `<Requests><Request Type='GetBeachTournament' No='${tournamentNo}' Fields='Code Name No NoEvent CountryCode Gender StartDateQualification StartDateMainDraw EndDateQualification EndDateMainDraw NbTeamsQualification NbTeamsMainDraw NbTeamsFromQualification' /></Requests>`,
				},
			});
			existingData.push(response.data);
			console.log(
				`The file tournament.json has been updated with data for tournament No. ${tournamentNo}!`,
			);
		} catch (error) {
			console.error(
				`Error getting data for tournament No. ${tournamentNo}:`,
				error,
			);
		}
	}
	fs.writeFile(
		"/usr/local/beach_volley_ball/db_fill/json/tournament.json",
		JSON.stringify(existingData, null, 2),
		"utf8",
		(err) => {
			if (err) throw err;

			getEventData();
		},
	);
}
async function getEventData() {
	const eventList = JSON.parse(
		fs.readFileSync(
			"/usr/local/beach_volley_ball/db_fill/json/tournament.json",
			"utf8",
		),
	);

	// Extract the distinct event numbers
	const eventNos = [
		...new Set(
			eventList.map((tournament) => tournament.responses[0].data.noEvent)
			.filter((noEvent) => noEvent !== null),
		),
	];

	const existingData = [];
	for (const eventNo of eventNos) {
		try {
			const response = await axios.get("/XmlRequest.asmx", {
				params: {
					Request: `<Requests><Request Type='GetEvent' No='${eventNo}' Fields='No Code Name CountryCode HasWomenTournament HasMenTournament StartDate EndDate'/></Requests>`,
				},
			});
			
			existingData.push(response.data);
			
			console.log(
				`The file eventlist.json has been updated with data for event No. ${eventNo}!`,
			);
		} catch (error) {
			console.error(`Error getting data for Event No. ${eventNo}:`, error);
		}
	}
	fs.writeFile(
		"/usr/local/beach_volley_ball/db_fill/json/eventlist.json",
		JSON.stringify(existingData, null, 2),
		"utf8",
		(err) => {
			if (err) throw err;
		},
	);
}
// axios
// 	.get("/XmlRequest.asmx", {
// 		params: {
// 			Request: `<Requests><Request Type='GetBeachEvent' No='${eventNo}' Fields='Code Name CountryCode HasWomenTournament HasMenTournament StartDate EndDate'><Filter IsVisManaged='True'  HasBeachTournament='True' /></Request></Requests>`,
// 		},
// 	})
// 	.then((response) => {
// 		const eventList = response.data;
// 		fs.writeFile("eventList.json", JSON.stringify(eventList), (err) => {
// 			if (err) throw err;
// 			console.log("The file eventList.json has been saved!");
// 		});
// 		// playersData.forEach(player => {
// 		//   console.log(player);
// 		// });
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});

// axios.get('/XmlRequest.asmx', {
//   params: {
//     Request: `<Requests><Request Type='GetPlayer' No='118429' Fields='FederationCode No FirstName Gender LastName Nationality PlaysBeach PlaysVolley TeamName' /></Requests>`
//   }
// })
// .then(response => {
//   const playerData = response.data;
//   fs.writeFile('player.json', JSON.stringify(playerData), (err) => {
//     if (err) throw err;
//     console.log('The file player.json has been saved!');
//   });
//   // playersData.forEach(player => {
//   //   console.log(player);
//   // });
// })
// .catch(error => {
//   console.error(error);
// });

// axios.get('/XmlRequest.asmx', {
//   params: {
//     Request: `<Requests><Request Type='GetBeachTeam' No='375442' Fields='No NoPlayer1 NoPlayer2 Player1FederationCode Player2FederationCode Name ConfederationCode Rank EarnedPointsTeam'/></Requests>`
//     }
//   })
//   .then(response => {
//     const teamData = response.data;
//     fs.writeFile('team.json', JSON.stringify(teamData), (err) => {
//       if (err) throw err;
//       console.log('The file team.json has been saved!');
//     });
//     // playersData.forEach(player => {
//     //   console.log(player);
//     // });
//   })
//     .catch(error => {
//     console.error(error);
//   });

// axios.all([Players, Team, Match, Tournament, Event])
//   .then(axios.spread((playersResponse, teamResponse, matchResponse, tournamentResponse, eventResponse) => {
//      playersResponse.responses.forEach(players => {
//       const player = players.data;
//       player.forEach(player => {
//         console.log(player);
//       })
//      });
//     // console.log(teamResponse.data);
//     // console.log(matchResponse.data);
//     // console.log(tournamentResponse.data);
//     // console.log(eventResponse.data);

//   }))
//   .catch(error => {
//     console.error(error);
//   });
