select distinct eventlist.code AS Event_Code,
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
from eventlist,
    tournaments,
    matches
where matches.notournament = tournaments.no
    and tournaments.noevent = eventlist.no --GROUP BY matches.notournament, matches.nointournament
ORDER BY matches.localdate ASC,
    matches.no ASC,
    matches.lokaltime ASC;