/* eslint-disable no-unused-vars */
//setTimeout(() => {
//const { Client } = require("pg");

import pg from 'pg';
import * as fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const client = new pg.Client({
	host: process.env.DB_HOST,
	port: 5432,
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
});

// Load data from the JSON file
function parseEventList() {
	const data = fs.readFileSync(
		"/usr/local/beach_volley_ball/db_fill/json/eventlist.json",
		"utf8",
	);
	return JSON.parse(data);
}
function parseTournamentData() {
	const data = fs.readFileSync(
		"/usr/local/beach_volley_ball/db_fill/json/tournament.json",
		"utf8",
	);
	const jsonObj = JSON.parse(data);
	// console.log(jsonObj)
	return jsonObj;
}
// function extractPlayerData () {
//   const data = fs.readFileSync('player.json', 'utf8')
//   return JSON.parse(data)
// }
// function extractTeamData () {
//   const data = fs.readFileSync('team.json', 'utf8')
//   return JSON.parse(data)
// }
function extractBeachMatchListData() {
	const data = fs.readFileSync(
		"/usr/local/beach_volley_ball/db_fill/json/beachmatchlist.json",
		"utf8",
	);
	return JSON.parse(data);
}

async function insertBeachMatchListData() {
	// Connect to your postgres DB
	const matchesData = extractBeachMatchListData();
	// Loop through the data and insert into the DB
	for (const matches of matchesData[0].data) {
		if (matches.localDate === "") {
			matches.localDate = null; // or a default date value if appropriate
		}
		await client.query(
			`INSERT INTO matches(
				no,
				notournament,
				nointournament,
				localdate,
				lokaltime,
				teamafederationcode,
				teambfederationcode,
				noteama,
				teamaname,
				teamatype,
				teamaposition,
				noteamb,
				teambname,
				teambtype,
				teambposition,
				court,
				matchpointsa,
				matchpointsb,
				pointsteamaset1,
				pointsteambset1,
				pointsteamaset2,
				pointsteambset2,
				pointsteamaset3,
				pointsteambset3,
				durationset1,
				durationset2,
				durationset3) VALUES 
				($1, $2, $3, $4, $5, $6, 
				$7 ,$8, $9,$10,$11,$12,
				$13,$14,$15,$16,
				$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27);`,
			[
				matches.no,
				matches.noTournament,
				matches.noInTournament,
				matches.localDate,
				matches.localTime,
				matches.teamAFederationCode,
				matches.teamBFederationCode,
				matches.noTeamA,
				matches.teamAName,
				matches.teamAType,
				matches.teamAPosition,
				matches.noTeamB,
				matches.teamBName,
				matches.teamBType,
				matches.teamBPosition,
				matches.court,
				matches.matchPointsA,
				matches.matchPointsB,
				matches.pointsTeamASet1,
				matches.pointsTeamBSet1,
				matches.pointsTeamASet2,
				matches.pointsTeamBSet2,
				matches.pointsTeamASet3,
				matches.pointsTeamBSet3,
				matches.durationSet1,
				matches.durationSet2,
				matches.durationSet3,
			],
		);

		// const res = await client.query('select distinct notournament from matches where notournament > 0;')
	}
}

async function insertTournamentData() {
	const tournamentsData = parseTournamentData();
	// tournamentsData = tournamentsData[0].responses
	// console.log(tournamentsData);
	// Loop through the data and insert into the DB
	// for (let tournament of tournamentData.responses.data) {
	for (const tournamentDataItem of tournamentsData) {
		// console.log(tournamentData)
		const tournamentData = tournamentDataItem.responses[0].data;
		// if (tournamentData.startDateQualification === '') {
		//   tournamentData.startDateQualification = null // or a default date value if appropriate
		// }
		// if (tournamentData.endDateQualification === '') {
		//   tournamentData.endDateQualification = null // or a default date value if appropriate
		// }
		await client.query(
			`INSERT INTO tournaments(
			  no,
			  code,
			  name,
			  gender,
			  noEvent,
			  countryCode,
			  startDateQualification,
			  startDateMainDraw,
			  endDateQualification,
			  endDateMainDraw,
			  nbTeamsQualification,
			  nbTeamsMainDraw,
			  nbTeamsFromQualification) VALUES 
			  ($1, $2, $3, $4, $5, $6, 
			  $7 ,$8, $9,$10,$11,$12,$13);`,
			[
				tournamentData.no,
				tournamentData.code,
				tournamentData.name,
				tournamentData.gender,
				tournamentData.noEvent,
				tournamentData.countryCode,
				tournamentData.startDateQualification,
				tournamentData.startDateMainDraw,
				tournamentData.endDateQualification,
				tournamentData.endDateMainDraw,
				tournamentData.nbTeamsQualification,
				tournamentData.nbTeamsMainDraw,
				tournamentData.nbTeamsFromQualification,
			],
		);
	}
}
async function insertEventListData() {
	const eventsData = parseEventList();
	// Loop through the data and insert into the DB
	for (const eventDataItem of eventsData) {
		const eventData = eventDataItem.responses[0].data;
		await client.query(
			// biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
			`INSERT INTO eventlist (no, code, name,countrycode, haswomentournament, hasmentournament,startdate,enddate) VALUES ($1, $2, $3, $4, $5, $6, $7,$8);`,
			[
				eventData.no,
				eventData.code,
				eventData.name,
				eventData.countryCode,
				eventData.hasWomenTournament,
				eventData.hasMenTournament,
				eventData.startDate,
				eventData.endDate,
			],
		);
	}
}

// async function insertPlayerData() {
//     // Connect to your postgres DB
//     const playerData = extractPlayerData();
//     // Loop through the data and insert into the DB
//     // for (let player of playerData.responses[0].data) {
//     await client.query('INSERT INTO players (no, federationcode, firstname, gender, lastname, playsbeach,playsvolley,teamname) VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8)',
//         [player.no, player.federationCode, player.firstName, player.gender,
//         player.lastName, player.playsBeach, player.playsVolley, player.teamName]);
//     //}
// }

// async function insertTeamData() {
//     // Connect to your postgres DB
//     const teamData = extractTeamData();
//     // Loop through the data and insert into the DB
//     for (let team of teamData.responses[0].data) {
//         await client.query('INSERT INTO teams (no, noplayer1,noplayer2,player1federationcode,player2federationcode,name,confederationcode,rank,earnedpointsteam) VALUES ($1, $2, $3, $4, $5, $6, $7 ,$8, $9)',
//             [team.no, team.noPlayer1, team.noPlayer2, team.player1FederationCode,
//             team.player2FederationCode, team.name, team.confederationCode, team.rank,]);
//     }
// }

async function connectToDb() {
	for (let i = 0; i < 5; i++) {
		try {
			console.log("Trying to connect to database");
			await client.connect();
			console.log("Connected to database");
			return;
		} catch (error) {
			console.log("Failed to connect to database, retrying in 5 seconds...");
			await new Promise((resolve) => setTimeout(resolve, 5000));
		}
	}
	console.log("Failed to connect to database after 5 attempts, exiting");
	process.exit(1);
}

async function main() {
	try {
		await connectToDb();
		await insertBeachMatchListData();
		await insertTournamentData();
		await insertEventListData();
		// await insertPlayerData();
		// await insertTeamData();
		console.log("Data inserted successfully");
	} catch (error) {
		console.error("Error inserting data:", error);
	} finally {
		await client.end();
	}
}

main();
//}, 20000);
