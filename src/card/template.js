var utils = require('../utils');


module.exports = {
	desktopTemplate: function (matchEvent) {		
		var el = `<div class="card">
		            <div class="card-container">               
                      <div class="card-container-header"> 				      
				          <div class="card-container-header-timer" style="background:${matchEvent['@event-color']}">
					  	   ${matchEvent['@minutes-elapsed']}
					  	  </div>   
				          <i class="lm-${matchEvent['@play-type']}"></i>
				          <h4 class="card-container-header-title">${utils.languages.ES[matchEvent['@play-type']]}</h4>
					  	<div class="card-container-header-oval"></div>
					  	<div class="card-container-header-line"></div>
                      </div>    
					  <div class="card-container-body"> 				      
				      	<p class="card-container-body-comment">${matchEvent['@comment']}</p>				      
					  </div>
				    </div>	  
                  </div>`;				  
		return $.parseHTML(el)[0];
		
	},
	mobileTemplate: function(matchEvent){
		var el = `<div class="card">
		            <div class="card-container">               
                      <div class="card-container-header"> 				      
				          <div class="card-container-header-timer" style="background:transparent;color:${matchEvent['@event-color'] ? matchEvent['@event-color'] : 'gray' }">
					  	   ${matchEvent['@minutes-elapsed']}
					  	  </div>   				          
					  	<div class="card-container-header-oval" style="background:${matchEvent['@event-color']}"></div>
					  	<div class="card-container-header-line" style="background:${matchEvent['@event-color']}"></div>
                      </div>
					  <div class="card-container-body"> 				      
					  	<i class="lm-${matchEvent['@play-type']}" style="color:${matchEvent['@event-color']}"></i>						
						<div> 
				      		<h4 class="card-container-body-title">${utils.languages.ES[matchEvent['@play-type']]}</h4>    
				      		<p class="card-container-body-comment">${matchEvent['@comment']}</p>				      						
							<a href="${matchEvent.permalink}/minuto-a-minuto" target="_blank"> 
							VER TODO EL MINUTO A MINUTO 
							<i class="permalink lm-arrow-right"></i>
							</a>
						</div>	  
					  </div>
				    </div>	  
                  </div>`;
		return $.parseHTML(el)[0];
	}
};