//banner
$('.intro1').fadeOut(5000);
$('.intro2').hide().fadeIn(3000).show(2000).fadeOut(2000);
$('#searchForm').fadeIn(3000);

let excluded = [];

$()

function getDataFromAPI(searchTerm, callback) {
	const  NYT_SEARCH_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	const query = {						
		part: 'response',
		'api-key': 'e7003c070aea44feb70e1298fd660497',
		q: searchTerm,
		per_page: 10
  }
  $.getJSON(NYT_SEARCH_URL, query, callback);
};


function renderResults (item) {
	return `
		<div>
			<a href="${item.web_url}" target="_blank"><h3>${item.headline.main}</h3></a>
		</div>`
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
		excluded.push(word);
		$('#excluded').append(`<button class="square">${word}</button`);
		$('.square').on('click', function(event) {
			$(this).hide();
		});
	});

	//change headline to array with strings
	//compare array with word
};

$(watchSubmit);


