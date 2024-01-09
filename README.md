
```XML
https://www.fivb.org/Vis2009/XmlRequest.asmx?Request=%3CRequest%20Type=%27GetBeachMatchList%27%20/%3E
````

## **GetBeachMatchList** 
- The ***NoTournament*** attribute is the unique Eventnumber so you get all the Matches in an event.


```XML
https://fivb.org/vis2009/XmlRequest.asmx?Request=<Requests><Request Type='GetBeachMatchList' Fields='No NoInTournament LocalDate LocalTime TeamAName TeamBName Court MatchPointsA MatchPointsB PointsTeamASet1 PointsTeamBSet1 PointsTeamASet2 PointsTeamBSet2 PointsTeamASet3 PointsTeamBSet3 DurationSet1 DurationSet2 DurationSet3'><Filter NoTournament='713' InMainDraw='true'/></Request></Requests>
```

## GetAllEvents

- get every event starting from a date and isVisManaged = 'True'. Including the info if the event has women or men Tournaments and is HasBeachTournament ='True'

#

```XML
https://www.fivb.org/vis2009/XmlRequest.asmx?Request=<Requests><Request Type='GetEventList' Fields='Code Name HasWomenTournament HasMenTournament StartDate EndDate'><Filter IsVisManaged='True' NoParentEvent='0' HasBeachTournament='True' StartDate='2011-01-01' EndDate='2011-12-31' /></Request></Requests>
```

## Get a specific match with the ***No*** field


```XML
https://www.fivb.org/vis2009/XmlRequest.asmx?Request=<Requests><Request Type='GetBeachMatch' No='106968' Fields='NoInTournament LocalDate LocalTime NoPlayerA1 NoPlayerA2 NoPlayerB1 NoPlayerB2 TeamAType TeamAName TeamBType TeamBName Court MatchPointsA MatchPointsB PointsTeamASet1 PointsTeamBSet1 PointsTeamASet2 PointsTeamBSet2 PointsTeamASet3 PointsTeamBSet3 DurationSet1 DurationSet2 DurationSet3'/></Requests>
```

## get a specific Team with ___No___ field 
```XML
https://www.fivb.org/vis2009/XmlRequest.asmx?Request=<Requests><Request Type='GetBeachTeam' No='375442' Fields='NoPlayer1 NoPlayer2 Player1FederationCode Player2FederationCode Name ConfederationCode Rank EarnedPointsTeam'/></Requests>
```

## Get a specific player with ___No___ field and show the gender 0 Man, 1 Woman
```XML
https://www.fivb.org/vis2009/XmlRequest.asmx?Request=<Requests><Request Type='GetPlayer' No='118429' Fields='FederationCode FirstName Gender LastName Nationality PlaysBeach PlaysVolley TeamName' /></Requests>
```


## Get a specific Event with the ___No___ field
```XML
https://www.fivb.org/vis2009/XmlRequest.asmx?Request=<Requests><Request Type='GetEvent' No='713' Fields='Code Name StartDate EndDate' /></Requests>
```

## Get a Tournament with the ___NoEvent___ field you get the Event it belongs to
```XML
https://www.fivb.org/vis2009/XmlRequest.asmx?Request=<Requests><Request Type='GetBeachTournament' No='502' Fields='Code Name CountryCode StartDateQualification StartDateMainDraw EndDateQualification EndDateMainDraw NbTeamsQualification NbTeamsMainDraw NbTeamsFromQualification' /></Requests>
```

<!-- https://fivb.org/vis2009/XmlRequest.asmx?Request=<Requests><Request Type='GetBeachMatchList' 
Fields='No NoInTournament LocalDate LocalTime TeamAName TeamBName Court MatchPointsA MatchPointsB PointsTeamASet1 PointsTeamBSet1 PointsTeamASet2 
PointsTeamBSet2 PointsTeamASet3 PointsTeamBSet3 DurationSet1 DurationSet2 DurationSet3'><Filter NoTournament='713' InMainDraw='true'/></Request></Requests>



https://www.fivb.org/vis2009/XmlRequest.asmx?Request=<Requests><Request Type='GetEventList'
Fields='Code Name HasWomenTournament HasMenTournament HasBeachTournament StartDate EndDate'><Filter IsVisManaged='True' HasBeachTournament='True' 
StartDate='2000-01-01' EndDate='2011-12-31' /></Request></Requests>


https://www.fivb.org/vis2009/XmlRequest.asmx?Request=<Requests><Request Type='GetBeachMatch' 
No='106968' Fields='NoInTournament LocalDate LocalTime NoPlayerA1 NoPlayerA2 NoPlayerB1 NoPlayerB2 TeamAType TeamAName TeamBType TeamBName Court MatchPointsA MatchPointsB 
PointsTeamASet1 PointsTeamBSet1 PointsTeamASet2 PointsTeamBSet2 PointsTeamASet3 PointsTeamBSet3 DurationSet1 DurationSet2 DurationSet3'/></Requests>


https://www.fivb.org/vis2009/XmlRequest.asmx?Request=<Requests><Request Type='GetPlayer' 
No='118429' Fields='FederationCode FirstName Gender LastName Nationality PlaysBeach PlaysVolley TeamName' /></Requests>

``` -->

##### use ```docker-compose up --build```
+ This command builds the images if they don't exist and starts the containers. The --build flag ensures that Docker Compose rebuilds the images even if they already exist.

##### use ```docker-compose down```
+ to stop the services

##### use ```docker-compose ps```
+ _to see the status of your services, This command lists the state of all the services defined in the docker-compose.yml file._
Remember, all these commands should be run in the same directory as your docker-compose.yml file._

##### use ```docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q) && docker volume rm $(docker volume ls -q) && docker rmi $(docker images -q)```
+ _to wipe everything (everything in your docker desktop)_




