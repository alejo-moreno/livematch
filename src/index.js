var sortByOrder = require('lodash.sortbyorder');
var union = require('lodash.union');

var cover = require('./cover/template');
var card = require('./card/template');

var $carouselContainer = $('.widget-carousel');

$(document).ready(init);

function init() {
    getMatchFeed(function (data) {
        var teams = setTeams(data);
        var info = setupData(teams, data);
        info.map(matchEvent => $carouselContainer.append(card.template(matchEvent)));
        $carouselContainer.slick({slidesToShow: 4, variableWidth: true});
    });
}

function setupData(teams, data) {
    var matchEvents = data['sports-content']['sports-event']['event-actions']['event-actions-soccer'];
    var foulEvents = matchEvents['action-soccer-penalty'].map(f => {
        f['@play-type'] = f['@penalty-level'];
        validateCardColor(f, teams);
        return f;
    });
    var playEvents = matchEvents['action-soccer-play'].map(p => {
        p['@minutes-elapsed'] == null && (p['@minutes-elapsed'] = 0); //sets to Zero events that happen before the match starts
        validateCardColor(p, teams);
        return p;
    });
    var goalEvents = matchEvents['action-soccer-score'].map(g => {
        g['@play-type'] = 'goal';
        g['@event-color'] = ~g['@comment'].indexOf(`(${teams.homeName})`)
            ? _colorHome
            : _colorAway;
        return g;
    });
    var substitutionEvents = matchEvents['action-soccer-substitution'].map(s => {
        s['@play-type'] = 'substitution';
        validateCardColor(s, teams);
        return s;
    });

    matchEvents = union(foulEvents, playEvents, goalEvents, substitutionEvents);
    //console.debug(matchEvents);
    return sortByOrder(matchEvents, [function (e) {
            return parseInt(e['@minutes-elapsed']) //Convierte minutos a enteros para ordenar de manera ascendente;
        }
    ]);
}

function validateCardColor(matchEvent, teams) {
    var isPeriod = ~matchEvent['@play-type'].indexOf('start') || ~matchEvent['@play-type'].indexOf('end') ||  ~matchEvent['@play-type'].indexOf('line-up');
    if (!isPeriod) {
        matchEvent['@event-color'] = ~matchEvent['@comment'].indexOf(teams.homeName)
            ? _colorHome
            : _colorAway;
    }
}

function setTeams(data) {
    var teams = {};
    teams.homeName = data["sports-content"]["sports-event"].team[1]["team-metadata"].name["@abbreviation"];
    teams.homeScore = data["sports-content"]["sports-event"].team[1]["team-stats"]["@score"];
    teams.awayName = data["sports-content"]["sports-event"].team[0]["team-metadata"].name["@abbreviation"];
    teams.awayScore = data["sports-content"]["sports-event"].team[0]["team-stats"]["@score"];
    $carouselContainer.append(cover.template(teams));
    return teams;
}

function getMatchFeed(callback) {
    var urlFeed = `http://ec2-54-175-245-216.compute-1.amazonaws.com/especiales/header-partidos/play-by-play/data/mock.json`;
    $.getJSON(urlFeed, function (result) {
        var data = result.data;
        callback(data);
    });
}