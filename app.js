//banner
$('.intro1').fadeIn(3000).show().fadeOut(3000);
$('.intro2').fadeIn(5000).show().fadeOut(3000);
$('.intro3').fadeIn(7000).show().fadeOut(3000);

$('#introForm').submit (event => {
	event.preventDefault();
	$('.introQuestions').hide();
	$('.intro4').show();
	$('#introForm').hide();
	$('.startForm').show();
});

$('.nextPage').hide();

$('.startForm').submit (event => {
	event.preventDefault();
	$('.banner').hide();
	$('.my-container').fadeIn(1000);
});

$('#searchForm').fadeIn(3000);
$('#excludedForm').fadeIn(3000);


let excluded = [];
let page = 0;
let searchTerm;

function findExcluded(headline) {
	for (var i=0; i<headline.length; i++) {
		for(var j=0; j<excluded.length; j++) {
		 	if (headline[i].toLowerCase() === excluded[j]) {
		 		return true;
 		  }
 		}
	};
	return false;
};

function getDataFromAPI(searchTerm, page, callback) {
	const  NYT_SEARCH_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	let query = {						
		part: 'response',
		'api-key': 'e7003c070aea44feb70e1298fd660497',
		q: searchTerm ,
		begin_date: 19890710,
		sort: "newest",
		page: page,
	};

	$.getJSON(NYT_SEARCH_URL, query, callback);
};

$('.nextPage').submit(event => {
	 event.preventDefault();
	 page ++;
	 getDataFromAPI(searchTerm, page, displayNewYorkTimesData);
});

function renderResults(item) {
	headline = item.headline.main;
	headline = headline.replace(/[’‘'"'']/g, " ");
	let checkForWords = headline.split(" ");
	if (findExcluded(checkForWords)) {
		return 
	} else {
		return `
			<div class="column">
				<a href="${item.web_url}" target="_blank"><h3>${headline}</h3></a>
			</div>`
	}
};

function displayNewYorkTimesData(data) {
	console.log(data.response.docs);
	let results;
	if (data.response.docs.length > 0) {
		results = data.response.docs.map((item, index) => renderResults(item));	
	}
	else {
		results = "No results found";
	}

  $('#results').html(results);
  $('.nextPage').show();
};

function watchSubmit() {
	$('#searchForm').submit(event => {
		event.preventDefault();
		searchTerm = $('#searchInput').val();
		$('#searchInput').val("");
		page = 0;
		getDataFromAPI(searchTerm, page, displayNewYorkTimesData);
	});

	$('#excludedForm').submit(event => {
		event.preventDefault();
		let word = $('#excludedInput').val();
		$('#excludedInput').val("");
		excluded.push(word.toLowerCase());
		$('#excluded').append(`<button class="square">${word}</button`);
		$('.square').on('click', function(event) {
			$(this).hide();
		});
	});
};

$(watchSubmit);


