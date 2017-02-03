
module.exports = {
	template: function (teams) {
		var el = `<div class="cover">
                    <h2>MINUTO A MINUTO</h2>
                    <div class="cover-team"> 				      
				        <span style="background:${teams._colorHome}"></span>   
				        <img src="${teams._logoHomeUrl}" class="cover-team-logo">				           
				        <h3 class="cover-team-name">${teams.homeName}</h3>
				        <h3 class="cover-team-score">${teams.homeScore}</h3>				      
                    </div>
                    <div class="cover-team">			          
			            <span style="background:${teams._colorAway}"></span>  
			            <img src="${teams._logoAwayUrl}" class="cover-team-logo">          				      
			           <h3 class="cover-team-name">${teams.awayName}</h3>
			           <h3 class="cover-team-score">${teams.awayScore}</h3>				        
			        </div>
                  </div>`;
		return $.parseHTML(el)[0];
	}
};