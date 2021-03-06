var sortByOrder = require('lodash.sortbyorder');
var union = require('lodash.union');
var utils = require('./utils')

var cover = require('./cover/template');
var card = require('./card/template');
var scoreHeader = require('./score-header/template');

var $widgetContainer = $('.widget-container');
var $carouselContainer = $('.widget-carousel');

var _colorHome = $widgetContainer.data('colorhome');
var _colorAway = $widgetContainer.data('coloraway');
var _logoHomeUrl = $widgetContainer.data('logohomeurl');
var _logoAwayUrl = $widgetContainer.data('logoawayurl');
var _eventKey = $widgetContainer.data('eventkey');

$(document).ready(function () {

    setInterval(() => {
        init(false);
        console.log('again');
    }, 10000);
    init(true);
});

function init(first) {
    getMatchFeed(function (data) {
        var teams = setTeams(data);
        var info = setupData(teams, data);

        if (utils.isMobile()) {
            $('.widget-container').prepend(scoreHeader.template(teams));
        } else {
            $('.widget-shadow a').attr("href", `${data.permalink}/minuto-a-minuto`);
        }

        /* Dynamic feed **/
        if (first) {
            $carouselContainer.append(cover.template(teams));
            info.map(matchEvent => $carouselContainer.append(utils.isMobile()
                ? card.mobileTemplate(matchEvent)
                : card.desktopTemplate(matchEvent)));
            $carouselContainer.slick({slidesToShow: 4, variableWidth: true, infinite: false});
        } else {
            $carouselContainer.slick('removeSlide', null, null, true);
            $carouselContainer.slick('addSlide', cover.template(teams));
            for (var matchEvent of info) {
                $carouselContainer.slick('addSlide', utils.isMobile()
                    ? card.mobileTemplate(matchEvent)
                    : card.desktopTemplate(matchEvent));
            }
        }
        /**********/
    });

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var scrollLimit = utils.isMobile()
            ? 265
            : 300;

        if (scroll >= scrollLimit) 
            $widgetContainer.addClass('sticky');
        else 
            $widgetContainer.removeClass('sticky');
        }
    );
}

function setupData(teams, data) {
    var matchEvents = data['sports-content']['sports-event']['event-actions']['event-actions-soccer'];
    var playEvents = [],
        foulEvents = [],
        goalEvents = [],
        substitutionEvents = [];

    if (matchEvents['action-soccer-play']) {
        playEvents = matchEvents['action-soccer-play'].map(p => {
            p['@minutes-elapsed'] == null && (p['@minutes-elapsed'] = 0); //sets to Zero events that happen before the match starts
            validateCardColor(p, teams);
            p.permalink = data.permalink;
            return p;
        });
    }

    if (matchEvents['action-soccer-penalty']) {
        foulEvents = matchEvents['action-soccer-penalty'].map(f => {
            f['@play-type'] = f['@penalty-level'];
            validateCardColor(f, teams);
            f.permalink = data.permalink;
            return f;
        });
    }

    if (matchEvents['action-soccer-score']) {
        goalEvents = matchEvents['action-soccer-score'].map(g => {
            g.permalink = data.permalink;
            g['@play-type'] = 'goal';
            g['@event-color'] = ~g['@comment'].indexOf(`(${teams.homeName})`)
                ? _colorHome
                : _colorAway;
            return g;
        });
    }

    if (matchEvents['action-soccer-substitution']) {
        substitutionEvents = matchEvents['action-soccer-substitution'].map(s => {
            s['@play-type'] = 'substitution';
            validateCardColor(s, teams);
            s.permalink = data.permalink;
            return s;
        })
    }

    matchEvents = union(playEvents, foulEvents, goalEvents, substitutionEvents);
    //console.debug(matchEvents);
    return sortByOrder(matchEvents, [function (e) {
            return parseInt(e['@minutes-elapsed']) //Convierte minutos a enteros para ordenar de manera ascendente;
        }
    ], ['desc']);
}

function validateCardColor(matchEvent, teams) {
    var isPeriod = ~matchEvent['@play-type'].indexOf('start') || ~ matchEvent['@play-type'].indexOf('end') || ~ matchEvent['@play-type'].indexOf('line-up');
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
    teams._colorHome = _colorHome;
    teams._colorAway = _colorAway;
    teams._logoHomeUrl = _logoHomeUrl;
    teams._logoAwayUrl = _logoAwayUrl;
    return teams;
}

function getMatchFeed(callback) {
    // var urlFeed =
    // `http://qa.x.univision.com/sports-feed-api/soccer/event-commentary/855399?lan
    // g =es-419?&jsonp=myJsonMethod&callback=?`;
    var urlFeed = `http://syndicator.univision.com/sports-feed-api/soccer/event-commentary/${_eventKey}?lang=es-419`;

    $.ajax({
        url: urlFeed,
        // Work with the response
        success: function (response) {
            var data = response.data;
            callback(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.responseJSON) 
                console.log(jqXHR.responseJSON.message)
        }
    });

    /*var matchEvents = data['sports-content']['sports-event']['event-actions']['event-actions-soccer'];
        localStorage.playEvents = localStorage.foulEvents = localStorage.goalEvents = localStorage.substitutionEvents = 0;
        if (matchEvents['action-soccer-play']) {
            localStorage.playEvents = matchEvents['action-soccer-play'].length > localStorage.playEvents && (matchEvents['action-soccer-play'].length);
        }
        if (matchEvents['action-soccer-penalty']) {
            localStorage.foulEvents = matchEvents['action-soccer-penalty'].length > localStorage.foulEvents && (matchEvents['action-soccer-penalty'].length);
        }
        if (matchEvents['action-soccer-score']) {
            localStorage.goalEvents = matchEvents['action-soccer-score'].length > localStorage.goalEvents && (matchEvents['action-soccer-score'].length);
        }
        if (matchEvents['action-soccer-substitution']) {
            localStorage.substitutionEvents = matchEvents['action-soccer-substitution'].length > localStorage.substitutionEvents && (matchEvents['action-soccer-substitution'].length);
        }*/
}