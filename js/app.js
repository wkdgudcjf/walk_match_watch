var fast=1;
( function () {
	window.addEventListener( 'tizenhwkey', function( ev )
		{
		if( ev.keyName == "back" ) 
		{
			tizen.application.getCurrentApplication().exit();
		}
	} );
	var mePage, historyPage, main ,teasePage;
	
	
	mePage = document.getElementById("mePage");
	historyPage = document.getElementById("historyPage");
	main = document.getElementById("main");
	teasePage = document.getElementById("teasePage");
	var dx;
	document.addEventListener("touchstart", function(e) {
		dx = e.touches.item(0).screenX;
	}, false);
	mePage.addEventListener("touchmove", function(e) {
	      if(dx >= 280 || dx < 40) {
	         var pTarget = e.touches.item(0);
	         if(pTarget.screenX-dx > 100) {
	            tau.changePage("#historyPage");
	  
	         }else if(dx - pTarget.screenX > 100) {
	            tau.changePage("#main");
	          
	         }
	       }
	   }, false);

	main.addEventListener("touchmove", function(e) {
	      if(dx >= 280 || dx < 40) {
	         var pTarget = e.touches.item(0);
	         if(pTarget.screenX-dx > 100) {
	            tau.changePage("#mePage");
	      
	          }else if(dx - pTarget.screenX > 100) {
	            tau.changePage("#historyPage");
	  
	         }
	         
	      }
	      
	   }, false);
	   
	historyPage.addEventListener("touchmove", function(e) {
	      if(dx >= 280 || dx < 40) {
	         var pTarget = e.touches.item(0);
	         if(pTarget.screenX-dx > 100) {
	            tau.changePage("#main");
	   
	         }else if(dx - pTarget.screenX > 100) {
	            tau.changePage("#mePage");
	    
	         }
	      }
	   }, false);
	
	teasePage.addEventListener("touchmove", function(e) {
	      if(dx >= 280 || dx < 40) {
	         var pTarget = e.touches.item(0);
	         if(pTarget.screenX-dx > 100) {
	        	if(fast==1)
	        	{
	        	 changeLeftTease();
	        	}
	         }else if(dx - pTarget.screenX > 100) {
	        	if(fast==1)
		        {
	        	 changeRightTease();
		        }
	         }
	      }
	   }, false);
	console.log("start");
	connect();
	var t=setTimeout("fetch('call')",1500);
	changeYou(1);
	
} () );
