$(document).ready(function(){
	var quotes = shuffle(getQuotes());										// getting and storing quotes
	var elements = {														// caching DOM elements
		image: $("#image"),
		message: $("#quote"),
		counter: $("#counter")
	}

	show();
	addEventListeners();

	/**************************************************/

	function getQuotes(){
		return JSON.parse($.ajax({
			type: "GET",
			url: "js/quotes.json",
			async: false,
			success: function(json){
				return json;
			}
		}).responseText);
	}

	// show quotes and image
	function show(){
		var index = elements.counter.text();
		elements.image.attr("src", quotes[index].image);
		elements.message.text(quotes[index].quote + "\" - " + quotes[index].character);
	}

	function addEventListeners(){
		$(".fa-arrow-circle-left").click(previous);
		$(".fa-arrow-circle-right").click(next);
		$(".fa-twitter").click(tweet);
	}

	function next(){
		var counter = Number(elements.counter.text());

		if(counter + 1 < quotes.length){
			counter++;
		} else {
			counter = 0;
		}

		elements.counter.text(counter);
		show();
	}

	function previous(){
		var counter = Number(elements.counter.text());

		if(counter - 1 >= 0){
			counter--;
		} else {
			counter = quotes.length - 1;
		}

		elements.counter.text(counter);
		show();
	}

	function tweet(){
		$(this).closest('a').attr('href','https://twitter.com/intent/tweet?text="' + elements.message.text());
	}
});

/***************************************************/

// This is the algorithm for shuffling array items
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
