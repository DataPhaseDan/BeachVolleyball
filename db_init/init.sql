DROP TABLE IF EXISTS Matches;
CREATE TABLE Matches (
	-- reference to the tournament
	no INTEGER PRIMARY KEY UNIQUE,
	noTournament INTEGER,
	--REFERENCES Tournaments(no)
	noInTournament INTEGER,
	localDate DATE,
	lokalTime TIME,
	teamAFederationCode TEXT,
	teamBFederationCode TEXT,
	--REFERENCES Teams(no)
	noTeamA INTEGER,
	teamAName TEXT,
	teamAType TEXT,
	teamAPosition INTEGER,
	--reference to the team
	noTeamB INTEGER,
	teamBName TEXT,
	teamBType TEXT,
	teamBPosition INTEGER,
	--reference to the team
	--REFERENCES Teams(no)
	court TEXT,
	matchPointsA INTEGER,
	matchPointsB INTEGER,
	pointsTeamASet1 INTEGER,
	pointsTeamBSet1 INTEGER,
	pointsTeamASet2 INTEGER,
	pointsTeamBSet2 INTEGER,
	pointsTeamASet3 INTEGER,
	pointsTeamBSet3 INTEGER,
	durationSet1 INTEGER,
	durationSet2 INTEGER,
	durationSet3 INTEGER
);
DROP TABLE IF EXISTS Tournaments;
CREATE TABLE Tournaments (
	no INTEGER PRIMARY KEY UNIQUE,
	code TEXT,
	name TEXT,
	Gender INTEGER,
	--reference to the event, if any
	noEvent INTEGER,
	--REFERENCES EventList(no) NULL,
	countryCode TEXT,
	startDateQualification DATE,
	startDateMainDraw DATE,
	endDateQualification DATE,
	endDateMainDraw DATE,
	nbTeamsQualification INTEGER,
	nbTeamsMainDraw INTEGER,
	nbTeamsFromQualification INTEGER
);
DROP TABLE IF EXISTS EventList;
CREATE TABLE EventList (
	no INTEGER PRIMARY KEY,
	code TEXT,
	name TEXT,
	countryCode TEXT,
	hasWomenTournament BOOLEAN,
	hasMenTournament BOOLEAN,
	startDate DATE,
	endDate DATE
);
-- CREATE TABLE Teams (
-- 	no INTEGER PRIMARY KEY UNIQUE,
-- 	--reference to the player
-- 	noPlayer1 INTEGER UNIQUE,
-- 	/*  REFERENCES Players(no), */
-- 	noPlayer2 INTEGER UNIQUE,
-- 	/* REFERENCES Players(no) */
-- 	player1FederationCode TEXT,
-- 	player2FederationCode TEXT,
-- 	name TEXT,
-- 	confederationCode TEXT,
-- 	rank INTEGER,
-- 	earnedPointsTeam INTEGER
-- );
/* DROP TABLE IF EXISTS Players;
 CREATE TABLE Players (
 no INTEGER PRIMARY KEY,
 federationCode TEXT,
 firstName TEXT,
 gender INTEGER,
 lastName TEXT,
 playsBeach BOOLEAN,
 playsVolley BOOLEAN,
 teamName TEXT
 ); */