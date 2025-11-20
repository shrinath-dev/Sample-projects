// javascript for our website

let searchTerm = document.getElementById('search');

// function toggleSuggestionContainer(){
//     const searchSuggestionContainer = document.getElementById('search-suggestion');
//     let current = searchSuggestionContainer.style.display;
//     current = current ? 'block' : 'none';
//     if(current === 'none') current = 'block'
//     else current = 'none';
// }
async function updateSearch(){
    const term = searchTerm.value;
    const searchSuggestion = await getCities(term);
    if(term.length > 2 && searchSuggestion ){
        const searchSuggestionContainer = document.getElementById('search-suggestion');
        const suggestionListElement = document.getElementById('suggestion-items');    
        suggestionListElement.innerHTML = '';
        for(let i = 0; i < searchSuggestion.length; i++){

            const suggestionListItem = document.createElement('div');
            suggestionListItem.className = 'suggestion-item';
            const cityName = document.createElement('p');
            cityName.className = 'city-name';
            cityName.innerText = searchSuggestion[i].name;
            suggestionListItem.appendChild(cityName);
            const countryName = document.createElement('p');
            countryName.classList = 'country-name';
            countryName.innerText = `${searchSuggestion[i].country}/${searchSuggestion[i].admin1}`;
            suggestionListItem.appendChild(countryName);
            suggestionListElement.appendChild(suggestionListItem);
        }
        searchSuggestionContainer.style.display = 'block';
        // toggleSuggestionContainer();
     }
    
}
function fillSearch(){
    const searchItems = document.getElementsByClassName('suggestion-item');
    const city = document.getElementsByClassName('city-name');
    if(searchItems){
        for(let i = 0; i < searchItems.length; i++){
            const id = `suggestion-${i}`;
            const cityId = `city-${i}`;
            searchItems[i].id = id;
            city[i].id = cityId;
            const city1 = document.getElementById(`city-${i}`);
            const item = document.getElementById(`suggestion-${i}`);
            item.addEventListener('click', (e) =>{
                searchTerm.value = city1.innerText;
                const searchSuggestionContainer = document.getElementById('search-suggestion');
                searchSuggestionContainer.style.display = 'none';
            })
        }

        
    }
}

searchTerm.addEventListener('input', async (e) =>{
    await updateSearch();
    fillSearch();
})
searchTerm.addEventListener('focusin', async (e) =>{
    await updateSearch();
    fillSearch();
})
searchTerm.addEventListener('change', (e) =>{
    const searchSuggestionContainer = document.getElementById('search-suggestion');
    searchSuggestionContainer.style.display = 'none';
})


async function getCities(term){
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${term}&count=5&language=en&format=json`;

    try{
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }

        const result = await response.json();
        return result.results;
    } catch(error){
        console.log(error.message);
    }
}

//
//
//
//

