
// ONE variables 

// object with id and names of cities
let cities =[
    {id: 2643743, name: "London", img: "london.jpg"},
    {id: 703448, name: "Kyiv",  img: "kiev-one.jpg"},
    {id: 2968815, name: "Paris", img: "paris.jpg"},
    {id: 4911455, name: "Sidney", img: "sidney.jpg"},
    {id: 5368361, name: "Los Angeles", img: "los-angeles.jpg"},
    {id: 7839402, name: "Darwin"}
]

// object with url and key of api
let api ={
    url:"https://api.openweathermap.org/data/2.5/",
    key:"15cad78a237a380b5d26cde250619a75"
}


// object with styles
let styles ={
    view: "./css/main-styles.css",
    print: "./css/print-style.css"
}



//  TWO functions

// creating element Select on base of object cities
function createSelect (object) {
    let citySelect = document.createElement("select");
    citySelect.classList.add("cities", "select");
    document.querySelector(".container").append(citySelect);
    for (let i=0; i<object.length; i++) {
        let cityOption =document.createElement("option");
        cityOption.classList.add("city");
        cityOption.value=object[i].id;
        cityOption.textContent=object[i].name;
        cityOption.setAttribute("data-picture", object[i].img)
        document.querySelector(".cities").append(cityOption) 
    }
}

// Fetch request on base of object api and refference to  showWeather() function
function getWeather( ) {
    let idCity =document.querySelector(".cities").value;
    fetch (`${api.url}weather?id=${idCity}&appid=${api.key}`)
    .then(function(resp){return resp.json()})
    .then(showWeather);  
} 

// DOM creator on base of the data from fetch
 function showWeather (data) {
    document.querySelector(".city").textContent=data.name;
    document.querySelector(".temp.value").innerHTML=Math.round(data.main.temp-273)+`<span> &#176</span>`;
    document.querySelector(".icon").innerHTML=`<img class="image" src="https://openweathermap.org/img/wn/${data.weather[0].icon }@2x.png"  alt ="weather icon">`
    document.querySelector(".description").innerHTML=data.weather[0].description;
    document.querySelector(".direction.value").innerHTML=data.wind.deg +`<span> &#176</span>`;
    document.querySelector(".speed.value").innerHTML=data.wind.speed + `<span class="num"> m/s</span>`;
    document.querySelector(".pressure.value").innerHTML= data.main.pressure +`<span class="num"> hPa</span>`; 
    document.querySelector(".country.value").innerHTML=data.sys.country;
    console.log(data)
}

//  to change background Image
function getPicture () {
    let optionCity = document.querySelectorAll(".city");
    let picture;
    for (let i=0; i< optionCity.length; i++) {
        if (optionCity[i].selected == true) {
            picture = optionCity[i].getAttribute("data-picture");
        }
    }
    document.querySelector("body").style.backgroundImage = `linear-gradient( 0deg, rgba(0, 0, 50, 0.5 ), rgba(136, 136, 206, 0.5) ), url("./img/${picture}")`;
    // document.querySelector("body").style.backgroundImage = `linear-gradient( 0deg, rgba(58, 58, 158, 0.9), rgba(136, 136, 206, 0.1) ), url("./img/${picture}")`;
}



//  create button PRINT
function toPrint () {
    let buttonPrint=document.createElement("button");
    buttonPrint.classList.add("button", "print")
    // buttonPrint.style.display="block"
    buttonPrint.textContent="Print";  
    document.querySelector(".container").append(buttonPrint);
}

function backToView () {
    let buttonToView=document.createElement("button");
    buttonToView.classList.add("button", "view")
    // buttonPrint.style.display="block"
    buttonToView.textContent="Back";  
    document.querySelector(".buttons").append(buttonToView);
}


// to change styles 

function StyleSheetPrint (object) {
    document.querySelector("link").href=object.print;

}

function StyleSheetView (object) {
    document.querySelector("link").href=object.view;

}




// THREE running the script
// creating Select on opening the page
createSelect(cities);  

// creating print on opening the page
toPrint ()

// creating backToView button
backToView ()

// calling fetch request and publishing  data on opening the page
getWeather ();

// calling fetch request and publishing  data on event onchange element Select class ="cities select"

// document.querySelector(".cities").onchange = getWeather;
document.querySelector(".cities").onchange = () => {
    getWeather();
    getPicture ()
} 


// calling button print 

document.querySelector(".print").onclick = () => {StyleSheetPrint(styles)};

// calling button back
document.querySelector(".view").onclick = () => {StyleSheetView(styles)};

// calling background picture by dafault
getPicture ()

// ===================


