//banner
//$('.intro1').fadeOut(5000);
//$('.intro2').hide().fadeIn(7000).show(4000).fadeOut(3000);

function getDataFromAPI(searchTerm, callback) {
	const  NYT_SEARCH_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	const query = {						
		part: 'headline',
		key : e7003c070aea44feb70e1298fd660497,
		q: searchTerm,
		per_page: 5
  }
  $.getJSON(NYT_SEARCH_URL, query, callback);
};


function renderResults (item) {
	return `
		<div>
			<h3>${docs.headline.main}</h3>
		</div>`
}


function displayNewYorkTimesData(data) {
	console.log(data);
	const results = data.items.map((item, index) => renderResult(item));
  $('#results').html(results);
};

function watchSubmit() {
$('#searchForm').submit(event => {
	event.preventDefault();
	const searchTerm = $('#searchInput').val();
	$('#searchInput').val("");
	getDataFromAPI(searchTerm, displayNewYorkTimesData);
});
};

$(watchSubmit);


