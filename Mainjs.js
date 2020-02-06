//set inital variables
let cityInput = [];
let currentPick = null;
let responseLocation = {};
let responseLocationObj = {};
let responseWeather = {};
let responseWeatherObj = {};
let responseForecast = {};
let responseForecastObj = {};
let responseUVI = {};
let responseUVIObj = {};
let latitude = "";
let longitude = "";
let lat2 = "";
let lng2 = "";

//long strin5 for bootstrap button format class
let buttonClass = "btnFormat btn btn-outline-secondary btn-lg btn-block m-1";
let weatherCardformat = "weatherCard border border-primary col-sm-2 m-2";
let cardImgFormat = "Img-fluid";
let cardTextFormat = "cardText";



//checking the local storage for info (call it right under because should run first)
function getStorage() {
    if (localStorage.getItem("cityInput") !== null) {
        window.localStorage.getItem('cityInput', JSON.stringify(cityInput));
        currentPick = cityInput[0];
        makeButtons();
        locationGet();
        todayCityData();
    } else {
        greetingMessage();
    };

};
getStorage();

//calculating today and putting it and greeting on the page
function datePlace() {
    let dateToday = moment().format('LL');
    $(".dateTitle").text(`Current Weather for Today:  ${dateToday}`);
};

//greeting message
function greetingMessage() {
    $(".cityTitle").text("Enter the City of your Choice to get the current weather and 5 day forecast. It can be any city worldwide.");
};


//putting picked city buttons array on page
function makeButtons() {
    $("#btnDiv").empty();
    for (i = 0; i < cityInput.length; i++) {
        let $btnSetup = $("<button>");
        $btnSetup.text(cityInput[i]);
        $btnSetup.addClass(buttonClass);
        $("#btnDiv").append($btnSetup);
    };
};

//putting new city in array, erasing input form and storing in local storage
function newCity() {
    cityInput.unshift(currentPick);
    $(".cityPickInfo").val("");
    window.localStorage.setItem('cityInput', JSON.stringify(cityInput));
};

//putting the current city data on the page
function todayCityData() {

    //putting the top date on the page
    datePlace();
    //putting the city on the ag{}
    $(".cityTitle").text(currentPick);
    //getting the corect icon from openweathermap and adding it on cityTitle
    let currentIcon = responseWeather.weather[0].icon;
    let iconURL = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`
    let $titleImage = $("<img>");
    $titleImage.attr("src", iconURL);
    $(".cityTitle").append($titleImage);
    //putting the latitude and longitude on the page
    $(".cityCoord").text(`Current Data:  (latitute: ${lat2} & longitude: ${lng2})`)
    //processing the temp info and putting on page
    let currentTemp = responseWeather.main.temp;
    //changing from Kelvin (0K − 273.15) × 9/5 + 32 = -459.7°F
    currentTemp = currentTemp - 273.15;
    currentTemp = currentTemp * 9;
    currentTemp = currentTemp / 5;
    currentTemp = currentTemp + 32;
    currentTemp1 = currentTemp.toFixed(1);
    $(".currentTempText").text(`Temperature:  ${currentTemp1}°`);
    //getting the wind speed and putting it on the page
    let currentWind = responseWeather.wind.speed;
    $(".currentwindSpeedText").text(`Wind Speed:   ${currentWind} mph`);

};



//API Functions

//getting latitude and logitude from google API
function locationGet() {
    let queryURLG = `https://maps.googleapis.com/maps/api/geocode/json?address=${currentPick}&key=AIzaSyCRTF7l44EF1KpczSGOLsMu5jewKiBDNW0`

    $.ajax({
            url: queryURLG,
            method: "GET"
        })
        .then(function (responseLocation) {
            responseLocationObj = responseLocation;
            console.log(responseLocation);

            //finding the geocoordinates in the response
            latitude = responseLocation.results[0].geometry.location.lat;
            lat2 = latitude.toFixed(2);
            longitude = responseLocation.results[0].geometry.location.lng;
            lng2 = longitude.toFixed(2);

            //run weather gets inside this because need the geodata
            let queryURLWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${lat2}&lon=${lng2}&APPID=56657235d578c7d8b7f0b5ce07c9c887`
            console.log("second AJAX");
            console.log(`Current Data:  (latitute: ${lat2} & longitude: ${lng2})`);
            $.ajax({
                    url: queryURLWeather,
                    method: "GET"
                })
                .then(function (responseWeather) {
                    responseWeatherObj = responseWeather
                    console.log(responseWeather);
                    //putting the top date on the page
                    datePlace();
                    //putting the city on the ag{}
                    $(".cityTitle").text(currentPick);
                    //getting the corect icon from openweathermap and adding it on cityTitle
                    let currentIcon = responseWeather.weather[0].icon;
                    let iconURL = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`
                    let $titleImage = $("<img>");
                    $titleImage.attr("src", iconURL);
                    $(".cityTitle").append($titleImage);
                    //putting the latitude and longitude on the page
                    $(".cityCoord").text(`Current Data:  (latitute: ${lat2} & longitude: ${lng2})`)
                    //processing the temp info and putting on page
                    let currentTemp = responseWeather.main.temp;
                    //changing from Kelvin (0K − 273.15) × 9/5 + 32 = -459.7°F
                    currentTemp = currentTemp - 273.15;
                    currentTemp = currentTemp * 9;
                    currentTemp = currentTemp / 5;
                    currentTemp = currentTemp + 32;
                    currentTemp1 = currentTemp.toFixed(1);
                    $(".currentTempText").text(`Temperature:  ${currentTemp1}°`);
                    //getting the wind speed and putting it on the page
                    let currentWind = responseWeather.wind.speed;
                    $(".currentwindSpeedText").text(`Wind Speed:   ${currentWind} mph`);
                });
        });

};


//using lat and long to get 5 day forecast
function openForecastGet() {
    let queryURLForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=56657235d578c7d8b7f0b5ce07c9c887`

    $.ajax({
            url: queryURLWeather,
            method: "GET"
        })
        .then(function (responseForecast) {
            responseForecastObj = responseForecast;
            console.log(responseForecast);
        });
};

//using lat and long to get 5 day forecast
function openUVIGet() {
    let queryURLUVI = `http://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&APPID=56657235d578c7d8b7f0b5ce07c9c887`

    $.ajax({
            url: queryURLUVI,
            method: "GET"
        })
        .then(function (responseUVI) {
            responseUVIObj = responseUVI;
            console.log(responseUVI);
        });
};

//erases the cityInput array and removes buttons from page
function eraseButton() {
    $("#btnDiv").empty();
    cityInput = [];
    window.localStorage.setItem('cityInput', JSON.stringify(cityInput));
};


//listen for button input and the magic starts
$(document).on("click", function () {

    $("#eraseCities").on("click", function () {
        eraseButton();

    });

    $(".cityPickBtn").on("click", function () {
        currentPick = $(".cityPickInfo").val();
        locationGet();
        newCity();
        todayCityData();

    });
});