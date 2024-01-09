import Table from "react-bootstrap/cjs/Table.js";
import React from "react";



function DataTable({ data }) {
	return (
		<Table striped bordered hover>
			<thead>
				<tr style={{position:'sticky', top:'0', backgroundColor:'#fff'}}>
					
					<th>Event Code</th>
					<th>Event Name</th>
					<th>Event Country</th>
					<th>Tournament Code</th>
					<th>Tournament Name</th>
					<th>Gender</th>
					<th>Tournament Country</th>
					<th>Start Date Qualification</th>
					<th>End Date Qualification</th>
					<th>Start Date Main Draw</th>
					<th>End Date Main Draw</th>
					<th>No of Match</th>
					<th>Number in the Tournament</th>
					<th>Local Date</th>
					<th>Local Time</th>
					<th>Team A federation Code</th>
					<th>Team B federation Code</th>
					<th>Team A Name</th>
					<th>Team B Name</th>
					<th>Court </th>
					<th>Matchpoints Team A</th>
					<th>Matchpoints Team B</th>
					<th>Set 1 Points Team A</th>
					<th>Set 2 Points Team A</th>
					<th>Set 3 Points Team A</th>
					<th>Set 1 Points Team B</th>
					<th>Set 2 Points Team B</th>
					<th>Set 3 Points Team B</th>
					<th>Duration Set 1</th>
					<th>Duration Set 2</th>
					<th>Duration Set 3</th>
					{/* Add more table headers here */}
				</tr>
			</thead>
			<tbody>
				{data.sort((a, b) => {
					// Compare localdate
					if (a.localdate < b.localdate) return -1;
					if (a.localdate > b.localdate) return 1;

					// If localdate is equal, compare no
					if (a.no < b.no) return -1;
					if (a.no > b.no) return 1;

					// If no is also equal, compare lokaltime
					if (a.lokaltime < b.lokaltime) return -1;
					if (a.lokaltime > b.lokaltime) return 1;

					// If all are equal, return 0
					return 0;
				}).map((row, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<tr key={index}>
						<td>{row.event_code}</td>
						<td>{row.event_name}</td>
						<td>{row.event_country}</td>
						<td>{row.tournament_code}</td>
						<td>{row.tournament_name}</td>
						<td>{row.gender}</td>
						<td>{row.countrycode}</td>
						<td>{new Date(row.startdatequalification).toLocaleDateString()}</td>
						<td>{new Date(row.enddatequalification).toLocaleDateString()}</td>
						<td>{new Date(row.startdatemaindraw).toLocaleDateString()}</td>
						<td>{new Date(row.enddatemaindraw).toLocaleDateString()}</td>
						<td>{row.no}</td>
						<td>{row.nointournament}</td>
						<td>{new Date(row.localdate).toLocaleDateString()}</td>
						<td>{new Date(row.lokaltime).toLocaleTimeString()}</td>
						<td>{row.teamafederationcode}</td>
						<td>{row.teambfederationcode}</td>
						<td>{row.teamaname}</td>
						<td>{row.teambname}</td>
						<td>{row.court}</td>
						<td>{row.matchpointsa}</td>
						<td>{row.matchpointsb}</td>
						<td>{row.pointsteamaset1}</td>
						<td>{row.pointsteamaset2}</td>
						<td>{row.pointsteamaset3}</td>
						<td>{row.pointsteambset1}</td>
						<td>{row.pointsteambset2}</td>
						<td>{row.pointsteambset3}</td>
						<td>{row.durationset1}</td>
						<td>{row.durationset2}</td>
						<td>{row.durationset3}</td>
						{/* Add more table data here */}
					</tr>
				))}
			</tbody>
		</Table>
	);
}

export default DataTable;
