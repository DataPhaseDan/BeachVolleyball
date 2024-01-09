import express from "express";
const app = express();

const port = 3000;
import ReactDOMServer from "react-dom/server";
import Table from "react-bootstrap/cjs/Table.js";
import React from "react";
import pg from "pg";
import DataTable from "./app.js";

// Create a new PostgreSQL client
const client = new pg.Client({
	connectionString:
		"postgresql://postgres:password@db:5432/BeachVolleyBall",
});

// Connect to the PostgreSQL database
client.connect();

app.get("/data", async (req, res) => {
	// Run your query here
	const result = await client.query(`
    SELECT DISTINCT
      eventlist.code AS event_code,
      eventlist.name AS event_name,
      eventlist.countrycode as event_country,
      tournaments.code as tournament_code,
      tournaments.name as tournament_name,
      CASE
        WHEN tournaments.gender = '1' THEN 'weiblich'
        WHEN tournaments.gender = '0' THEN 'männlich'
        ELSE 'other'
      END AS gender,
      tournaments.countrycode,
      tournaments.startdatequalification,
      tournaments.enddatequalification,
      tournaments.startdatemaindraw,
      tournaments.enddatemaindraw,
      matches.no,
      matches.nointournament,
      matches.localdate,
      matches.lokaltime,
      matches.teamafederationcode,
      matches.teambfederationcode,
      matches.teamaname,
      matches.teambname,
      matches.court,
      matches.matchpointsa,
      matches.matchpointsb,
      matches.pointsteamaset1,
      matches.pointsteamaset2,
      matches.pointsteamaset3,
      matches.pointsteambset1,
      matches.pointsteambset2,
      matches.pointsteambset3,
      matches.durationset1,
      matches.durationset2,
      matches.durationset3
    FROM eventlist, tournaments, matches
    WHERE matches.notournament = tournaments.no
      AND tournaments.noevent = eventlist.no
    ORDER BY matches.localdate ASC, matches.no ASC, matches.lokaltime ASC;
  `);

	// Create a React element for your table component
	const table = React.createElement(DataTable, { data: result.rows });

	// Render the table component to an HTML string
	const tableHtml = ReactDOMServer.renderToString(table);
const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Data Table</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div id="root">${tableHtml}</div>
    
</body>
</html>
`;
  

	// Send the HTML string as the response
	res.send(html);
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}/data`);
});
