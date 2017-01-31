(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = {
	template: function (teams) {
		var el = `<div class="cover">
                    <h1>Minuto a Minuto</h1>
                    <div class="cover-team"> 				      
				        <span style="background:${$home}"></span>   
				        <img src="http://cdn2.uvnimg.com/88/b2/e54452154af3866fa978155fba35/32-eb.png" class="cover-team-logo">				           
				        <h3 class="cover-team-name">${teams.homeName}</h3>
				        <h3 class="cover-team-score">${teams.homeScore}</h3>				      
                    </div>
                    <div class="cover-team">			          
			            <span style="background:${$away}"></span>  
			            <img src="http://cdn1.uvnimg.com/a7/dc/482b448e41fa87116c1458c9ff6b/31-eb.png" class="cover-team-logo">          				      
			           <h3 class="cover-team-name">${teams.awayName}</h3>
			           <h3 class="cover-team-score">${teams.awayScore}</h3>				        
			        </div>
                  </div>`;
		return $.parseHTML(el)[0];
	}
};
},{}],2:[function(require,module,exports){
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
},{"./cover/template":1}]},{},[2]);
