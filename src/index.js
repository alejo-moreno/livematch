var sortByOrder = require('lodash.sortbyorder');
var union = require('lodash.union');

var cover = require('./cover/template');

var carouselContainer = document.querySelector('.widget-carousel');

$(document).ready(init);

function init() {
    getMatchFeed(function (data) {
        setCoverCard(data);
        var info = setupData(data);
    });
}

function setupData(data) {
    var matchEvents = data['sports-content']['sports-event']['event-actions']['event-actions-soccer'];
    var foulEvents = matchEvents['action-soccer-penalty'].map(p => {
        p.event_type = 'F';
        return p;
    });
    var playEvents = matchEvents['action-soccer-play'].map(p => {
        p.event_type = 'P';
        p['@minutes-elapsed'] == null && (p['@minutes-elapsed'] = 0); //sets to Zero events before the match starts
        return p;
    });
    var goalEvents = matchEvents['action-soccer-score'].map(p => {
        p.event_type = 'G';
        return p;
    });
    var substitutionEvents = matchEvents['action-soccer-substitution'].map(p => {
        p.event_type = 'S';
        return p;
    });

    matchEvents = union(foulEvents, playEvents, goalEvents, substitutionEvents);
    return sortByOrder(matchEvents, ['@minutes-elapsed'], ['desc']);
}

function setCoverCard(data) {
    var teams = {};
    teams.homeName = data["sports-content"]["sports-event"].team[1]["team-metadata"].name["@abbreviation"];
    teams.homeScore = data["sports-content"]["sports-event"].team[1]["team-stats"]["@score"];
    teams.awayName = data["sports-content"]["sports-event"].team[0]["team-metadata"].name["@abbreviation"];
    teams.awayScore = data["sports-content"]["sports-event"].team[0]["team-stats"]["@score"];
    carouselContainer.appendChild(cover.template(teams));
    $('.widget-carousel').slick({});
}

function getMatchFeed(callback) {
    var urlFeed = `http://ec2-54-175-245-216.compute-1.amazonaws.com/especiales/header-partidos/play-by-play/data/mock.json`;
    $.getJSON(urlFeed, function (result) {
        var data = result.data;
        callback(data);
    });
}