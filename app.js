//banner
//$('.intro2').hide().fadeIn(3000).show(2000).fadeOut(2000);
//$('#searchForm').fadeIn(3000);

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
		q: searchTerm,
		per_page: 20
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


