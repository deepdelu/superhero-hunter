const searchInput = document.getElementsByClassName('form-control');
const searchButton = document.getElementsByClassName('search-btn');
const searchForm = document.querySelector('.app-header-search');
const searchlist = document.getElementById('search-list');

//searching
const getInputValue = (e)=>{
    e.preventDefault();
    let searchText = searchForm.search.value;
    // fetchAllSuperHero(searchText);
    if (searchText !== '') {
        fetch('https://superheroapi.com/api.php/1953802511419258/search/' + searchText.trim())
            .then(response => response.json())
            .then(data => {
                itemlist(data);
                // console.log(data);
            })
            .catch(err => console.log(err));
    }
}

// search submission
searchForm.addEventListener('submit',getInputValue);

//creating cards
function itemlist(data) {
    searchlist.classList.remove('hide');
    if (data.response === 'error') {
        searchlist.innerHTML = '<div class = "search-list-item"><p>oops!.. try with another keyword</p></div>';
    }

    else {
        searchlist.innerHTML = null;
        //Creating cards for all the results
        for (let i = 0; i < data.results.length && i < 10; i++) {
            // Creating card elements
            var item = document.createElement('div');
            item.classList.add('search-list-item');
            var itemImg = document.createElement('img');
            var itemText = document.createElement('p');
            var heart = document.createElement('i');
            var info = document.createElement('i');
            heart.classList.add('fa-regular');
            heart.classList.add('fa-heart');
            info.classList.add('fa-solid');
            info.classList.add('fa-info');

            //Adding Superhero names
            item.innerText = data.results[i].name;
            item.appendChild(itemText);

            //Adding display images to cards (from results)
            itemImg.src = data.results[i].image.url;
            item.appendChild(itemImg);
            // item.appendChild(heart);

            // Adding Details button to all cards
            item.appendChild(info);

            //If search results already in My Favourites List,
            //Show Add button else Remove button
            let heroId = data.results;
            // console.log(heroId);
            
            item.appendChild(heart);
            searchlist.appendChild(item);

            //Linking id with favorite and details buttons to add to favorites
            //or display details respectively
            heart.setAttribute('superheroId', data.results[i].id);
            info.setAttribute('superheroId', data.results[i].id);

            heart.setAttribute('divType', 'fav-btn');
            info.setAttribute('divType', 'details-btn');

            //Appending all cards to Results-div
            searchlist.appendChild(item); 
            item.addEventListener('click',()=>{
                updateDetailSection(data.results[i]);
            })
        }
    }
}
// onclick on body to remove results
document.body.addEventListener('click',()=>{
    searchlist.classList.add('hide');
})
// home section ends here
// details section starts;
// menu head
const stat= document.getElementsByClassName('powerstat');
const biography= document.getElementsByClassName('biography');
const appearance= document.getElementsByClassName('appearance');
const connection= document.getElementsByClassName('connection');
// menu section
const statSection= document.getElementsByClassName('powerstatSection');
const biographySection= document.getElementsByClassName('biographySection');
const appearanceSection= document.getElementsByClassName('appreranceSection');
const connectionSection= document.getElementsByClassName('connectionSection');
function display(sectionId){
    if(sectionId == 'powerstats')
    {
       for(let i=0;i<statSection.length;i++)
       {
        statSection[i].style.display="block";
       };
        for(let i=0;i<biographySection.length;i++)
       {
        biographySection[i].style.display="none";
       };
        for(let i=0;i<appearanceSection.length;i++)
       {
        appearanceSection[i].style.display="none";
       };
        for(let i=0;i<connectionSection.length;i++)
       {
        connectionSection[i].style.display="none";
       };  
       console.log('powerstat') ;
    }
    else if(sectionId == 'biography')
    {
        for(let i=0;i<statSection.length;i++)
       {
        statSection[i].style.display="none";
       };
        for(let i=0;i<biographySection.length;i++)
       {
        biographySection[i].style.display="block";
       };
        for(let i=0;i<appearanceSection.length;i++)
       {
        appearanceSection[i].style.display="none";
       };
        for(let i=0;i<connectionSection.length;i++)
       {
        connectionSection[i].style.display="none";
       };  
    }
    else if(sectionId == 'appearance')
    {
       for(let i=0;i<statSection.length;i++)
       {
        statSection[i].style.display="none";
       };
        for(let i=0;i<biographySection.length;i++)
       {
        biographySection[i].style.display="none";
       };
        for(let i=0;i<appearanceSection.length;i++)
       {
        appearanceSection[i].style.display="block";
       };
        for(let i=0;i<connectionSection.length;i++)
       {
        connectionSection[i].style.display="none";
       };  
    }
    else{
         for(let i=0;i<statSection.length;i++)
       {
        statSection[i].style.display="none";
       };
        for(let i=0;i<biographySection.length;i++)
       {
        biographySection[i].style.display="none";
       };
        for(let i=0;i<appearanceSection.length;i++)
       {
        appearanceSection[i].style.display="none";
       };
        for(let i=0;i<connectionSection.length;i++)
       {
        connectionSection[i].style.display="block";
       };  
    }   
}
// button section on details add eventListener
const button =  document.querySelectorAll('.tabhead-button');
button.forEach(click=>click.addEventListener('click',(e)=>{
    const sectionId = click.innerText.toLowerCase();
    display(sectionId);
}));
// tranforming data to details section starts
// helper function to set value
function setvalue(selector,value)
{
    document.querySelector(`[data-${selector}]`).textContent=value;
}
function updateDetailSection(data)
{
    // detail header starts
    // img
    document.querySelector('[data-super-hero-img]').src=data.image.url;
    console.log(data);
    // name
    setvalue("superHero-name",data.name);
    // detail header ends

    // powerStats section
    updatePowerStatsSection(data.powerstats);

    // biography section
    updateBiographySection(data.biography);

    // appearance section
    updateAppearanceSection(data.appearance);

    // connection
    updateConnectionSection(data.connections);
}
function updatePowerStatsSection(data)
{
    setvalue("intellegence",data.intelligence);
    setvalue("strength",data.strength);
    setvalue("speed",data.speed);
    setvalue("durability",data.durability);

}
function updateBiographySection(data)
{
    setvalue("full-name",Object.values(data)[0]);
    setvalue("alter-egos",Object.values(data)[1]);
    setvalue("place-of-birth",Object.values(data)[3]);
    setvalue("first-appearance",Object.values(data)[4]);
}
function updateAppearanceSection(data)
{
    setvalue("gender",data.gender);
    setvalue("race",data.race);
    setvalue("height",data.height[0]);
    setvalue("weight",data.weight[0]);
}
function updateConnectionSection(data)
{
    setvalue("group-afflication",Object.values(data)[0]);
    setvalue("relative",data.relatives);
}
// tranforming data to details section ends

// setBackGroundImage
function changeBackground(){
    const changeBackgroundId = document.getElementById('app-home');
    const backgroundImage = [
        "url('./image/neon2.jpg')",
       "url('./image/neon3.jpg')",
        "url('./image/neon4.jpg')",
        "url('./image/neon5.jpg')",
        "url('./image/neon6.jpg')"
    ];
    const bg = backgroundImage[Math.floor(Math.random() * (backgroundImage.length-1))];
    changeBackgroundId.style.backgroundImage=bg;
}
setInterval(changeBackground,5000);