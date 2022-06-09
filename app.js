// API Parameters (Global)
const apiKey = 'RNtYFS9Q4vYDV1E5LLJsw58nQdlOZReC';
const resultsLimit = 9; 
var apiPage = 0;
var currSearchTerm = '';
// HTML Elements Selectors
const searchEl = document.getElementById('search');
const userInputEl = document.getElementById('user-input');
const gifSectionEl = document.getElementById('gif-section');
const showMoreBtn = document.getElementById('show-more-button');

// function that will get search results from the API
async function getResults(input){
    // offset calculation
    const offset = apiPage * resultsLimit;
    const apiUrl = `http://api.giphy.com/v1/gifs/search?q=${input}&api_key=${apiKey}&limit=${resultsLimit}&rating=g&lang=en&offset=${offset}`
    // use the fetch method with your custom HTTP request
    const response = await fetch(apiUrl);
    // convert the response to a JSON object
    const jsonResponse = await response.json();
    // return the data of the response
    return jsonResponse;
}

// function will take in the response data as a parameter and 
// inject each gif into the HTML
function displayResults(results){
    // map() method creates a new array populated with the results of calling 
    // a provided function on every element in the calling array
    const htmlGif = results.data.map( gif => 
    `<div class="gif">
        <img src="${gif.images.original.url}"/>
    </div>`).join('');
    // join() method takes all items in an iterable and joins them into one string.
    // ***needed in order to later append all gifs into inner HTML***
    
     // need to make interated elemtns in one string
    gifSectionEl.innerHTML += htmlGif;
}

// Add an event listener to the search form that senses the submit event.
searchEl.addEventListener('submit', handleFormSubmit);
showMoreBtn.addEventListener('click', handleShowMeMoreClick);

// function to run the steps when the search form is submitted
async function handleFormSubmit(evt){
    evt.preventDefault();
    // Each time a new search starts, be sure to clear any existing gifs in the gif div area.
    gifSectionEl.innerHTML = '';
    // Store the search term by grabbing the value attribute 
    // from the DOM reference of the search text input.
    currSearchTerm = userInputEl.value
    // Make an API call using the search term.
    const results = await getResults(currSearchTerm)
    // Display the results of the response data.
    displayResults(results)
    // After the results are displayed, replace the search term in the input text box back to 
    // an empty string.
    userInputEl.value = "";
    apiPage++;
    showMoreBtn.classList.remove('hidden');

}

async function handleShowMeMoreClick(evt) {
    const results = await getResults(currSearchTerm);
    displayResults(results);
    apiPage++;
}
