
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