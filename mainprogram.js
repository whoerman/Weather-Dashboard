//set inital variables
let cityInput = [];
let currentPick = null;

//long strin5 for bootstrap button format class
let buttonClass = "btnFormat btn btn-outline-secondary btn-lg btn-block m-1";
let weatherCardformat = "weatherCard border border-primary col-sm-2 m-2";
let cardImgFormat = "Img-fluid";
let cardTextFormat = "cardText";

//checking the local storage for info
function getStorage() {
    if (localStorage.getItem("cityInput") !== null) {
        cityInput = JSON.parse(window.localStorage.getItem('cityInput'));
        currentPick = cityInput[0];
        $(".cityTitle").text(currentPick);
        makeButtons();
    };
};
getStorage();

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

//calculating today and putting it on the page
let dateToday = moment().format('LL');
$(".dateTitle").text(dateToday);


//button input and the magic starts
$(document).ready(function () {

    $(".cityPickBtn").on("click", function () {
        currentPick = $(".cityPickInfo").val();
        console.log(currentPick);


        //getting latitude and logitude from google
        let queryURLG = `https://maps.googleapis.com/maps/api/geocode/json?address=${currentPick}&key=AIzaSyCRTF7l44EF1KpczSGOLsMu5jewKiBDNW0`

        $.ajax({
                url: queryURLG,
                method: "GET"
            })
            .then(function (responseG) {
                console.log(responseG);
                let latitude = responseG.results[0].geometry.location.lat;
                let longitutude = responseG.results[0].geometry.location.lng;
                $(".cityCoord").text(`(latitute: ${latitude} & longitude: ${longitutude})`)
                buttonProcess();
                cardprocess();

                //

                //putting in array and making a button and on page
                function buttonProcess() {
                    cityInput.unshift(currentPick);
                    $(".cityTitle").text(currentPick);
                    $(".cityPickInfo").val("");
                    console.log(cityInput);
                    window.localStorage.setItem('cityInput', JSON.stringify(cityInput));
                    makeButtons();
                };

                //Generating the weather cards
                function cardprocess() {
                    $(".cardDiv").empty();
                    for (i = 1; i < 6; i++) {

                        //making the div for each card

                        let $cardSetup = $("<div>"); 
                        $cardSetup.addClass(weatherCardformat);

                        //formatting and setting the date on the card
                        let futureDate = moment().add(i, "days").format('LL');
                        let $futureDateH5 = $("<h5>");
                        $futureDateH5.text(futureDate);
                        $futureDateH5.addClass(cardTextFormat);
                        $cardSetup.append($futureDateH5);

                        //formatting and setting the image on the card
                        let $futureImage = $("<img>");
                        $futureImage.addClass(cardImgFormat);                        
                        $cardSetup.append($futureImage);

                        //formatting and setting the temp on the card
                        let futureTemp = ("98 degrees")
                        let $futureTempH5 = $("<h5>");
                        $futureTempH5.text(futureTemp);
                        $futureTempH5.addClass(cardTextFormat);
                        $cardSetup.append($futureTempH5);

                        //formatting and setting the humidity on the card
                        let futureHumid = ("62 percent")
                        let $futureHumidH5 = $("<h5>");
                        $futureHumidH5.text(futureHumid);
                        $futureHumidH5.addClass(cardTextFormat);
                        $cardSetup.append($futureHumidH5);

                        //putting the card on the page
                        $(".cardDiv").append($cardSetup); 
                    };
                };

                //erases the cityInput array and removes buttons from page
                $("#eraseCities").on("click", function () {
                    $("#btnDiv").empty();
                    cityInput = [];
                    console.log(cityInput);
                    window.localStorage.setItem('cityInput', JSON.stringify(cityInput));
                });

            });

    });

});