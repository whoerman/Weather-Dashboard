//setting some intital variavbles
let currentPick = "";
let currentPickProcessed ="";

//long string for bootstrap button format class
let buttonClass = "btnFormat btn btn-outline-secondary btn-lg btn-block font-weight-bold m-1";

//putting the date on the page after City
let dateToday = moment().format('LL');
$(".dateTitle").text(`: ${dateToday} `);

//placing the City on the page
function placeCity() {
    let currentPick = currentPickProcessed;
    $(".cityTitle").text(currentPick);
}

//placing the parameter values on the page

    //placing the Temeperature on the page
    let currentTempTextV = "98 degrees";
    $(".currentTempText").text(` ${currentTempTextV}`);

    //placing the Humidity on the page
    let currentHumidTextV = "60 percent";
    $(".currentHumidText").text(` ${currentHumidTextV}`);

    //placing the Wind Spped on the page
    let currentWindSpeedTextV = "50 mph";
    $(".currentwindSpeedText").text(` ${currentWindSpeedTextV}`);

    //placing the Wind Spped on the page
    let currentUVIndexTextV = "9.2";
    $(".currentUVIndexText").text(` ${currentUVIndexTextV}`);

// making the display button for previous picks
function makeButton() {
    let btnSetup = $("<button>");
    btnSetup.text(currentPickProcessed);
    btnSetup.addClass(buttonClass);
    $("#btnDiv").prepend(btnSetup);
}


//buttons to listen for the city input
$(document).ready(function () {

    $(".cityPickBtn").on("click", function () {
        currentPickRough = $(".cityPickInfo").val();
        fixCityPick();
        makeButton();
        emptyEntry();
        placeCity();
    });

    $("#eraseCities").on("click", function () {
        emptyCityList();
    });

});

//make sure the city is a legit city
function fixCityPick() {
    currentPickProcessed = currentPickRough;
};

//emptying the input 
function emptyEntry() {
    $(".cityPickInfo").val("");
};

//emptying the input 
function emptyCityList() {
    $("#btnDiv").empty();
};

//starting the call to wetaher API
let APIKey = "166a433c57516f51dfab1f7edaed8413";

let queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;