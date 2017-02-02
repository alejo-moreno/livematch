
module.exports = {
	template: function (teams) {
		var el = `<div class="score-header">
                    <div class="score-header-team" style="background:${_colorHome}">
                      <h3 class="score-header-team-name">${teams.homeName.substring(0,3)}</h3>
                      <h3 class="score-header-team-score">${teams.homeScore}</h3>
                    </div>                    
                    <div class="score-header-team" style="background:${_colorAway}">
                      <h3 class="score-header-team-name">${teams.awayName.substring(0,3)}</h3>
                      <h3 class="score-header-team-score">${teams.awayScore}</h3>
                    </div>
                  </div>`;
		return $.parseHTML(el)[0];
	}
};