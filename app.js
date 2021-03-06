

			//banner section
$('.intro1').fadeIn(3000).show().fadeOut(3000);
$('.intro2').fadeIn(5000).show().fadeOut(3000);
$('.intro3').fadeIn(7000).show().fadeOut(3000);
$('.intro5').hide();
$('.mobileForm').fadeIn(1000);
$('.buttonExpl').hide();

$('#introForm').submit (event => {
	event.preventDefault();
	$('.introQuestions').hide();
	$('.intro4').show();
	$('#introForm').hide();
	$('.startForm').show();
	$('.buttonContinue').hide();
	$('.buttonExpl').show();
});

$('.nextPage').hide();
$('.previousPage').hide();
$('#excluded').hide();
$('.excludedExplain').hide();

$('.startExpl').submit (event => {
	event.preventDefault();
	$('.intro4').hide();
	$('.intro5').show();
	$('.buttonExpl').hide();
	$('.buttonContinue').show();
})

$('.startForm').submit (event => {
	event.preventDefault();
	$('.banner').hide();
	$('.my-container').fadeIn(1000);
	$('.buttonContinue').hide();
	$('.intro5').hide();
});

$('.mobileForm').submit (event => {
	event.preventDefault();
	$('.mobileButtonContinue').hide();
	$('.mobileHeader').hide();
	$('.mobileContinue').hide();
	$('.my-container').fadeIn(1000);
});

$('#searchForm').fadeIn(3000);
$('#excludedForm').fadeIn(3000);

let excluded = [];
let page = 0;
let searchTerm;
let data = [];

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
	$.getJSON(NYT_SEARCH_URL, query, serverResults => {
		data = serverResults.response.docs;
		callback(data);
	})
};

function renderResults(item) {
	headline = item.headline.main;
	headline = headline.replace(/[’‘'"'']/g, " ");
	let checkForWords = headline.split(" ");
	if (findExcluded(checkForWords)) {
		return 
	} else {
		return `
		<div class="column">
			<a href="${item.web_url}" target="_blank"><h3>${headline}</h3>
			<div class="printDate">Date of publication: ${moment(item.pub_date).format("MMM Do YY")}</div></a>
		</div>`
	}
};

$('.column').click(function() {
  window.location = $(this).find("a").attr("href"); 
  return false;
});

function displayNewYorkTimesData(data) {
	console.log(data);
	let results;
	if (data.length > 0) {
		results = data.map((item, index) => renderResults(item));	
	}
	else {
		results = "No results found";
	}
  $('#results').html(results);
  $('.nextPage').show(); 
};

function showPrevious() {
	$('.previousPage').show();
	$('.nextPageSection').css({"justify-content":"space-between"});
}

function hidePrevious() {
	$('.previousPage').hide();
	$('.nextPageSection').css({"justify-content":"flex-end"});
}

function watchSubmit() {
	$('#searchForm').submit (event => {
		event.preventDefault();
		searchTerm = $('#searchInput').val();
		$('#searchInput').val("");
		page = 0;
		getDataFromAPI(searchTerm, page, displayNewYorkTimesData);
	});
	
	$('.nextPage').on('click', function(event) {
		page++;
		getDataFromAPI(searchTerm, page, displayNewYorkTimesData);
		showPrevious();
	});

	$('.previousPage').on('click', function(event) {
		page--;
		getDataFromAPI(searchTerm, page, displayNewYorkTimesData);
		if (page === 0) {
			hidePrevious();
		}
	});
	
	$('#excludedForm').submit (event => {
		event.preventDefault();
		let word = $('#excludedInput').val();
		$('#excludedInput').val("");
		excluded.push(word.toLowerCase());
		$('#excluded').append(`<button class="square">${word}</button`);
		$('#excluded').show();
		$('.excludedExplain').show();

		displayNewYorkTimesData(data);
	});
	
	$('#excluded').on('click', '.square', function(event) {
			$(this).hide();
	});		
};

$(watchSubmit);


