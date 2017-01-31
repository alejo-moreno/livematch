var cover = require('./cover/template');
//var carousel = require('./carousel/template');

var widgetContainer = document.querySelector('.widget-container');
var carouselContainer = document.querySelector('.widget-carousel');




$(document).ready(init);

function init() {
    getMatchFeed(function (teams) {
        // carouselContainer.innerHTML = cover.template(teams);
        var elHTML = cover.template(teams);
        teams.homeName = "Barcelona";
        var elHTML2 = cover.template(teams);
        carouselContainer.appendChild(elHTML);
        carouselContainer.appendChild(elHTML2);
        $('.widget-carousel').slick({});
    });
}


function getMatchFeed(callback) {
    var urlFeed = 'http://ec2-54-175-245-216.compute-1.amazonaws.com/especiales/header-partidos/play-by-play/data/mock.json';
    $.getJSON(urlFeed, function (result) {
        var data = result.data;
        console.log(data);
        var teams = {};
        teams.homeName = data["sports-content"]["sports-event"].team[1]["team-metadata"].name["@abbreviation"];
        teams.homeScore = data["sports-content"]["sports-event"].team[1]["team-stats"]["@score"];
        teams.awayName = data["sports-content"]["sports-event"].team[0]["team-metadata"].name["@abbreviation"];
        teams.awayScore = data["sports-content"]["sports-event"].team[0]["team-stats"]["@score"];
        callback(teams);
    });
}