//this is where you define your functions
function askStatus() {
	console.log("done yet?");
}

function fadeInLater() {
	$('#flower-img').fadeToggle(3000, 'linear', askStatus);
}

$(document).ready(function() {

	$('#flower-button').click(function() {
		// $('#flower-img').fadeToggle(3000, 'linear', fadeInLater );
		$('#flower-img').fadeToggle(3000, 'linear');
		$('#flower-img').fadeToggle(3000, 'linear');
		console.log('done yet?');
	})
}); 
