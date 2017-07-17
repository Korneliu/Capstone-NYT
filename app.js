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

$('.startForm').submit (event => {
	event.preventDefault();
	$('.banner').hide();
	$('.container').fadeIn(1000);
});

$('#searchForm').fadeIn(3000);
$('#excludedForm').fadeIn(3000);


let excluded = [];

function findExcluded(headline) {
	for (var i=0; i<headline.length; i++) {
		for(var j=0; j<excluded.length; j++) {
		 if (headline[i].toLowerCase() === excluded[j]) {
		 	return true;
 		 }}
	};
	return false;
};

function getDataFromAPI(searchTerm, callback) {
	const  NYT_SEARCH_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	const query = {						
		part: 'response',
		'api-key': 'e7003c070aea44feb70e1298fd660497',
		q: searchTerm ,
		'begin_date': 19890710,
		'sort': "newest",
		key_page: 20
  }
  $.getJSON(NYT_SEARCH_URL, query, callback);
};

function renderResults(item) {
	headline = item.headline.main;
	console.log(headline);
	headline = headline.replace(/’‘;t'"/g, "d");
	console.log(headline);
	let checkForWords = headline.split(" ");
	if (findExcluded(checkForWords)) {
		return 
	} else {
		return `
			<div>
				<a href="${item.web_url}" target="_blank"><h3>${item.headline.main}</h3></a>
			</div>`
	}
};

function displayNewYorkTimesData(data) {
	console.log(data);
	const results = data.response.docs.map((item, index) => renderResults(item));
  $('#results').html(results);
};

function watchSubmit() {
	$('#searchForm').submit(event => {
		event.preventDefault();
		const searchTerm = $('#searchInput').val();
		$('#searchInput').val("");
		getDataFromAPI(searchTerm, displayNewYorkTimesData);
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


