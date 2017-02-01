
module.exports = {
	template: function (teams) {
		var el = `<div class="cover">
                    <h1>Minuto a Minuto</h1>
                    <div class="cover-team"> 				      
				        <span style="background:${_colorHome}"></span>   
				        <img src="${_logoHomeUrl}" class="cover-team-logo">				           
				        <h3 class="cover-team-name">${teams.homeName}</h3>
				        <h3 class="cover-team-score">${teams.homeScore}</h3>				      
                    </div>
                    <div class="cover-team">			          
			            <span style="background:${_colorAway}"></span>  
			            <img src="${_logoAwayUrl}" class="cover-team-logo">          				      
			           <h3 class="cover-team-name">${teams.awayName}</h3>
			           <h3 class="cover-team-score">${teams.awayScore}</h3>				        
			        </div>
                  </div>`;
		return $.parseHTML(el)[0];
	}
};