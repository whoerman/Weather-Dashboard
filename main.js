//checking for stuff in local storage
let cityInput = [];
let resultsArray = [];

//long strin5 for bootstrap button format class
let buttonClass = "btnFormat btn btn-outline-secondary btn-lg btn-block m-1";
let weatherCardformat = "weatherCard border border-primary col-sm-2 m-2";
let cardImgFormat = "Img-fluid align-self-center";
let cardTextFormat = "cardText";

//prepping the site for filling
$("#btnDiv").empty();
$(".currentWeather").empty();
$(".cardsHeaderDiv").empty();
$(".cardsDiv").empty();
$(".pictureDiv").empty();

//checking for storage
function getStorage() {
    if (localStorage.getItem("resultsArray") !== null) {
        cityInput = JSON.parse(window.localStorage.getItem('cityInput'));
        if (cityInput !== []) {
            runDataOutputs();
            makeButtons();
        } else {
            entryMessage();
        }
    } else {
        entryMessage();
    };
};
getStorage();

//filling the pager the first time
function entryMessage() {
    $EntryMessage = $("<h1>");
    $EntryMessage.text("Welcome to the Weather Planner! Enter a city to get the current weather and the 5 day forecast...");
    $(".currentWeather").append($EntryMessage);
};


//putting buttons array on page
function makeButtons() {
    $("#btnDiv").empty();
    for (i = 0; i < cityInput.length; i++) {
        let $btnSetup = $("<button>");
        $btnSetup.text(cityInput[i]);
        $btnSetup.addClass(buttonClass);
        $("#btnDiv").append($btnSetup);
    };
};

//put the data on the page
function runDataOutputs() {
    resultsArray = JSON.parse(window.localStorage.getItem('resultsArray'));
    //making the main div for current data
    $(".currentWeather").empty();
    $currentData = $("<div>");
    //calculating today and putting it in the iv
    let dateToday = moment().format('LL');
    $currentDateTexT = $("<h5>");
    $currentDateTexT.text(`Current Weather for Today:  ${dateToday}`);
    $currentDateTexT.addClass("textOverCity");
    $currentData.append($currentDateTexT);
    //adding the city
    $currentCityText = $("<h2>");
    $currentCityText.text(`${resultsArray[0].results[0].components.city}, `);
    if ((resultsArray[0].results[0].components.country) == "United States of America") {
        $currentCityText.append(resultsArray[0].results[0].components.state);
    } else {
        $currentCityText.append(resultsArray[0].results[0].components.country);
    };
    $currentCityText.addClass("cityTitle");
    //adding the current weather icon to the current weather
    $currentImage = $("<img>");
    let currentIcon = `https://openweathermap.org/img/wn/${resultsArray[1].weather[0].icon}@2x.png`
    $currentImage.attr("src", currentIcon);
    $currentImage.addClass(cardImgFormat);
    $currentCityText.append($currentImage);
    $currentData.append($currentCityText);
    //adding current data
    $currentElements1 = $("<h5>");
    $currentElements1.text(`Current Data:  (latitute: ${resultsArray[0].results[0].geometry.lat} & longitude: ${resultsArray[0].results[0].geometry.lng})`)
    $currentData.append($currentElements1);
    //adding the current conditions
    $currentElements2 = $("<h5>");
    $currentElements2.text(`In ${resultsArray[0].results[0].components.city}, the weather is ${resultsArray[1].weather[0].main}`)
    $currentData.append($currentElements2);
    //adding the temp and wind speed
    $currentElements3 = $("<h5>");
    let currentTemp = resultsArray[1].main.temp;
    currentTemp = parseInt((currentTemp - 273.15) * (9 / 5) + 32);
    $currentElements3.text(` The temperature is ${currentTemp}° with a current wind speed of ${resultsArray[1].wind.speed} mph `)
    $tempicon = $("<i>");
    $tempicon.addClass("fas fa-temperature-low");
    $currentElements3.prepend($tempicon);
    $windicon = $("<i>");
    $windicon.addClass("fas fa-wind");
    $currentElements3.append($windicon);
    $currentData.append($currentElements3);
    //adding the humidity
    $currentElements4 = $("<h5>");
    $currentElements4.text(` The current humidity is ${resultsArray[1].main.humidity}%. `);
    $humidicon = $("<i>");
    $humidicon.addClass("fas fa-tint");
    $currentElements4.prepend($humidicon);
    $currentData.append($currentElements4);
    //adding the UV index
    $currentElements5 = $("<h5>");
    $currentElements5.text(`The current UV Index is ${resultsArray[3].value}, which is `);
    if ((resultsArray[3].value) < 2.01) {
        $currentElements5.append("low.");
    } else if ((resultsArray[3].value) < 5.01) {
        $currentElements5.append("moderate.");
    } else if ((resultsArray[3].value) < 7.01) {
        $currentElements5.append("high.");
    } else if ((resultsArray[3].value) < 10.01) {
        $currentElements5.append("very high.");
    } else {
        $currentElements5.append("extreme.");
    }
    $currentData.append($currentElements5);
    //putting current data on the page
    $(".currentWeather").append($currentData);
    //adding the 5 day header
    $(".cardsDiv").empty();
    $cardDiv = $("<div>");
    $(".cardsHeaderDiv").empty();
    $FivedayHeader = $("<h4>");
    $FivedayHeader.text(` The 5 Day Forecast for ${resultsArray[0].results[0].components.city}: `)
    $fiveDayicon = $("<i>");
    $fiveDayicon.addClass("far fa-address-card");
    $FivedayHeader.prepend($fiveDayicon);
    $(".cardsHeaderDiv").append($FivedayHeader);
    //making the 5 day cards
    for (i = 7; i < 41; i = i + 8) {
        let $cardSetup = $("<div>");
        $cardSetup.addClass(weatherCardformat);
        //putting date on card
        $cardDateText = $("<h5>");
        let cardTime = moment.unix(resultsArray[2].list[i].dt).format("MMM-DD-YYYY");
        $cardDateText.text(` ${cardTime}`);
        $cardSetup.append($cardDateText);
        $cardDateIcon = $("<i>");
        $cardDateIcon.addClass("far fa-calendar-alt");
        $cardDateText.prepend($cardDateIcon);
        $cardSetup.append($cardDateText);
        //putting image on card
        $cardImage = $("<img>");
        let futureIcon = `https://openweathermap.org/img/wn/${resultsArray[2].list[i].weather[0].icon}@2x.png`
        $cardImage.attr("src", futureIcon);
        $cardImage.addClass(cardImgFormat);
        $cardSetup.append($cardImage);
        //putting temp on card
        $cardTemp = $("<h6>");
        let currentTempC = resultsArray[2].list[i].main.temp;
        currentTempC = parseInt((currentTempC - 273.15) * (9 / 5) + 32);
        $cardTemp.text(` Temperature: ${currentTempC}°`);
        $tempCicon = $("<i>");
        $tempCicon.addClass("fas fa-temperature-low");
        $cardTemp.prepend($tempCicon);
        $cardSetup.append($cardTemp);
        //putting humidty on card
        $cardHumid = $("<h6>");
        $cardHumid.text(` Humidity: ${resultsArray[2].list[i].main.humidity}%`);
        $humidCicon = $("<i>");
        $humidCicon.addClass("fas fa-tint");
        $cardHumid.prepend($humidCicon);
        $cardSetup.append($cardHumid);
        //putting the card on the page
        $(".cardsDiv").append($cardSetup);
    };
}

function GetCurrentCoord() {
    let tempCity = cityInput[0];
    let queryURLC = `https://api.opencagedata.com/geocode/v1/json?q=${tempCity}&key=63cf2e6281434548bf4cb97453552a80`

    $.ajax({
        url: queryURLC,
        method: "GET"
    }).then(function (responseCoords) {
        let latitude = responseCoords.results["0"].geometry.lat;
        let longitude = responseCoords.results["0"].geometry.lng;
        resultsArray = [];
        resultsArray.push(responseCoords);

        let queryURLW = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=88dab7f3d6a8c90dc7c2922c01115f44`

        $.ajax({
            url: queryURLW,
            method: "GET"
        }).then(function (responseCurrentWeather) {
            resultsArray.push(responseCurrentWeather);

            let queryURLF = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=88dab7f3d6a8c90dc7c2922c01115f44`

            $.ajax({
                url: queryURLF,
                method: "GET"
            }).then(function (responseFutureWeather) {
                resultsArray.push(responseFutureWeather);

                let queryURLU = `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&APPID=88dab7f3d6a8c90dc7c2922c01115f44`

                $.ajax({
                    url: queryURLU,
                    method: "GET"
                }).then(function (responseUVIWeather) {
                    resultsArray.push(responseUVIWeather);
                    console.log("inside" + resultsArray);
                    window.localStorage.setItem('resultsArray', JSON.stringify(resultsArray));
                    runDataOutputs();
                });
            });
        });
    });
};



//button input and the magic starts
$(document).ready(function () {

    //button to get city user input and start process
    $(".cityPickBtn").on("click", function () {
        currentPick = $(".cityPickInfo").val();
        $(".cityPickInfo").val("");
        cityInput.unshift(currentPick);
        window.localStorage.setItem('cityInput', JSON.stringify(cityInput));
        $("#btnDiv").empty();
        $(".currentWeather").empty();
        $(".cardsHeaderDiv").empty();
        $(".cardsDiv").empty();
        makeButtons();
        GetCurrentCoord();
        //runDataOutputs();
    });

    //button to get city user input and start process
    $("#eraseCities").on("click", function () {
        resultsArray = [];
        window.localStorage.setItem('resultsArray', JSON.stringify(resultsArray));
        cityInput = [];
        window.localStorage.setItem('cityInput', JSON.stringify(cityInput));
        $("#btnDiv").empty();
        $(".currentWeather").empty();
        $(".cardsHeaderDiv").empty();
        $(".cardsDiv").empty();
    });
});