//setting some intital variavbles
let currentPick = "";
let currentPickProcessed = "";
let futureTempValue = "";
let futureMainA ="";
let futureMainB ="";
let futureMainC ="";
let futureMainD ="";
let futureMainE ="";
let futureTempA ="";
let futureTempB ="";
let futureTempC ="";
let futureTempD ="";
let futureTempE ="";
let futureHumidA ="";
let futureHumidB ="";
let futureHumidC ="";
let futureHumidD ="";
let futureHumidE ="";

//calculating today and the next 6 days
let dateToday = moment().format('LL');
let futureDateA = moment().add(1, "days").format('LL');
let futureDateB = moment().add(2, "days").format('LL');
let futureDateC = moment().add(3, "days").format('LL');
let futureDateD = moment().add(4, "days").format('LL');
let futureDateE = moment().add(5, "days").format('LL');

//long strin5 for bootstrap button format class
let buttonClass = "btnFormat btn btn-outline-secondary btn-lg btn-block m-1";

//putting the date on the page after City
$(".dateTitle").text(`: ${dateToday} `);

//placing the City on the page
function placeCity() {
    let currentPick = currentPickProcessed;
    $(".cityTitle").text(currentPick);
}

//placing the parameter values on the page
function putCurrentData() {
//placing the Temeperature on the page
con
$(".currentTempText").text(` ${getCurrentTemp}`);

//placing the Humidity on the page
let currentHumidTextV = "60 percent";
$(".currentHumidText").text(` ${currentHumidTextV}`);

//placing the Wind Spped on the page
let currentWindSpeedTextV = "50 mph";
$(".currentwindSpeedText").text(` ${currentWindSpeedTextV}`);

//placing the Wind Spped on the page
let currentUVIndexTextV = "9.2";
$(".currentUVIndexText").text(` ${currentUVIndexTextV}`);
};

// making the display button for previous picks
function makeButton() {
    let btnSetup = $("<button>");
    btnSetup.text(currentPickProcessed);
    btnSetup.addClass(buttonClass);
    $("#btnDiv").prepend(btnSetup);
};

//processing the cards
function processCards() {
    addFutureDates();
    addFutureGraphics();
    addFutureTemps();
    addFutureHumid();

};

        //displaying the dates on the 5 day forecast
        function addFutureDates() {
            $(".cardText1A").text(futureDateA);
            $(".cardText2A").text(futureDateB);
            $(".cardText3A").text(futureDateC);
            $(".cardText4A").text(futureDateD);
            $(".cardText5A").text(futureDateE);
        };

        //add graphics (temporary)
        function addFutureGraphics() {
            $(".cardText1B").text(futureMainA);
            $(".cardText2B").text(futureMainB);
            $(".cardText3B").text(futureMainC);
            $(".cardText4B").text(futureMainD);
            $(".cardText5B").text(futureMainE);
        };
        //add graphics (temporary)
        function addFutureTemps() {
            $(".cardText1C").text(futureTempA);
            $(".cardText2C").text(futureTempB);
            $(".cardText3C").text(futureTempC);
            $(".cardText4C").text(futureTempD);
            $(".cardText5C").text(futureTempE);
            };
            //add graphics (temporary)
        function addFutureHumid() {
            $(".cardText1D").text(futureHumidA);
            $(".cardText2D").text(futureHumidB);
            $(".cardText3D").text(futureHumidC);
            $(".cardText4D").text(futureHumidD);
            $(".cardText5D").text(futureHumidE);
            };



//buttons to listen for the city input
$(document).ready(function () {

    $(".cityPickBtn").on("click", function () {
        currentPickRough = $(".cityPickInfo").val();
        fixCityPick();
        makeButton();
        emptyEntry();
        placeCity();
        getData();
        putCurrentData();
        processCards();
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

