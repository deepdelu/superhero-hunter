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
function display(makevisible,sectionId){
    if(sectionId == 'powerstat')
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
       console.log('powerstat')  
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
const button =  document.querySelectorAll('.tabhead-button');
button.forEach(click=>click.addEventListener('click',(e)=>{
    const sectionId = click.innerText.toLowerCase();
    const makevisible = document.getElementsByClassName(sectionId);
    display(makevisible,sectionId);
}));



///// Getting elements using id's
const name = document.getElementsByClassName('superhero-name');
const image = document.getElementsByClassName('superhero-img');
const fav = document.getElementsByClassName('favourite');


// Getting Superhero id for details
const params = new URLSearchParams(window.location.search);
var id = params.get('id');

//Getting Favourites List from LocalStorage
var favList = JSON.parse(localStorage.getItem("favList")) === null
    ? []
    : JSON.parse(localStorage.getItem("favList"));

//Fetching Superhero details from Superhero API
fetch(`https://superheroapi.com/api.php/1953802511419258/${id}`)
    .then(res => res.json())
    .then(data => showDetails(data))
    .catch(err => console.log(err));

//Render Superhero details
function showDetails(data) {

   //Setting name
   name.innerHTML = data.name;

   //Setting display image
   image.src = data.image.url;
   image.alt = "Image not found";

   //Setting favourite
   
   //Setting Power Meters
   for (var i in data.powerstats) {
       document.getElementsByClassName(i).innerHTML = data.powerstats[i] + "%";
       //Power Meter Style Setting
      //  document.getElementById(i).style.width = data.powerstats[i] + "%"
   }

   //Setting Appearance props.
   for (var i in data.appearance) {
       document.getElementsByClassName(i).innerHTML = data.appearance[i];
   }

   //Setting Bio
   // for (var i in data.biography) {
   //     document.getElementsByClassName(i).innerHTML = data.biography[i];
   // }

   //Setting Connection props.
   // for (var i in data.connections) {
   //     document.getElementById(i).innerHTML = data.connections[i];
   // }
}