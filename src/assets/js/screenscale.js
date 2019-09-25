window.onresize = function(){
	window.requestAnimationFrame(function () {
	  var AvailableWidth = window.innerWidth;
	  var fontSize = (AvailableWidth/375)*20;
      jsEnvironment = document.getElementById('physical');
      if(fontSize>=40){
        fontSize = 40;
      }
	  jsEnvironment.style.fontSize = fontSize+'px';
	});
}
window.onload = function(){
	  var AvailableWidth = window.innerWidth;
	  var fontSize = (AvailableWidth/375)*20;
      jsEnvironment = document.getElementById('physical');
      if(fontSize>=40){
        fontSize = 40;
      }
	  jsEnvironment.style.fontSize = fontSize+'px';
}
