var translations = require('../utils');


module.exports = {
	template: function (matchEvent) {
		
		var el = `<div class="card">
		            <div class="card-container">               
                      <div class="card-container-header"> 				      
				          <div class="card-container-header-timer" style="background:${matchEvent['@event-color']}">
					  	   ${matchEvent['@minutes-elapsed']}
					  	  </div>   
				          <i class="lm-${matchEvent['@play-type']}"></i>
				          <h4 class="card-container-header-title">${translations.ES[matchEvent['@play-type']]}</h4>
					  	<div class="card-container-header-oval"></div>
					  	<div class="card-container-header-line"></div>
                      </div>    
				      <p class="card-container-comment">${matchEvent['@comment']}</p>				      
				    </div>	  
                  </div>`;
		return $.parseHTML(el)[0];
	}
};