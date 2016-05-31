var yodafeels = function(sentence) {
	if (!MASHAPE_KEY) alert('Cannot make call without API key!');
	
	async.parallel({
			yoda : function(callback){
				$.ajax(
					{
						url : 'https://yoda.p.mashape.com/yoda',
						type: "GET",
						headers: {
							"X-Mashape-Key" : MASHAPE_KEY,
							"Accept" : "text/plain"
						},
						data : {
							sentence : sentence
						},
						success : function(res) {
							callback(null,res);
						}
					}
				);
			},
			sentiment : function(callback){
				$.ajax(
					{
						url : 'https://community-sentiment.p.mashape.com/text/',
						type: "POST",
						headers: {
							"X-Mashape-Key" : MASHAPE_KEY,
							'Content-Type' : 'application/x-www-form-urlencoded',
							'Accept' : 'application/json'
						},
						data : {
							txt : sentence
						},
						success : function(res) {
							// console.log(res);
							callback(null,res);
						}
					}
				);
			}
		},// optional callback
		function(err, results){
			if (results.sentiment.result.sentiment === "Negative") {
				$('.yoda').css("background-image", "url('images/negative.jpg')");
			} else if (results.sentiment.result.sentiment === "Positive") {
				$('.yoda').css("background-image", "url('images/positive.jpg')");
			} else {
				$('.yoda').css("background-image", "url('images/neutral.jpg')");
			}

			$('.text').html(results.yoda);
		});
};

$(document).on('ready', function() {
	$('form').submit(function(e) {
		e.preventDefault();

		yodafeels($('.original').val());

		return false;
	});
});
