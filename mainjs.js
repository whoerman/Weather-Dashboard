//setting some intital variavbles
let currentPick = "";
let currentPickProcessed ="";

//putting the date on the page after City
let dateToday = moment().format('LL');
$(".dateTitle").text(`: ${dateToday} `);


//defining the variable for animation end signal for animate.css
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

//defining the variables for animations to be used for animate.css
var animationShake = "animated shake";

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
function makeButton
    

//buttons to listen for the city input
$(document).ready(function () {

    $(".cityPickBtn").on("click", function () {
        currentPickRough = $(".cityPickInfo").val();
        fixCityPick();
        placeCity();
    });
});

//make sure the city is a legit city
function fixCityPick() {
    currentPickProcessed = currentPickRough;
}
