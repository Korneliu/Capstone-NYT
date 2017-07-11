//banner
$('.intro').text('whatever').delay(2000).fadeOut(4000);


function getDataFromAPI(searchTerm, callback) {
	const = NYT_SEARCH_URL = 'http://api.nytimes.com/svc/search/v1';
	const query = {

	}
}



// render results


function displayNewYorkTimesData(data) {

};

function watchSubmit() {
$('#searchForm').submit(event => {
	event.preventDefault();
	const searchTerm = $('#searchInput').val();
	$('#searchInput').val("");
	getDataFromAPI(searchTerm, displayNewYorkTimesData);

});
};


