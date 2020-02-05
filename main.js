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
        buttonProcess();

        //putting in array and making a button and on page
        function buttonProcess() {
            cityInput.unshift(currentPick);
            $(".cityTitle").text(currentPick);
            $(".cityPickInfo").val("");
            window.localStorage.setItem('cityInput', JSON.stringify(cityInput));
            makeButtons();
        };


        //getting latitude and logitude from google
        let queryURLG = `https://maps.googleapis.com/maps/api/geocode/json?address=${currentPick}&key=AIzaSyCRTF7l44EF1KpczSGOLsMu5jewKiBDNW0`

        $.ajax({
                url: queryURLG,
                method: "GET"
            })
            .then(function (responseG) {
                console.log(responseG);
                let latitude = responseG.results[0].geometry.location.lat;
                let lat3 = latitude.toFixed(3);
                let longitutude = responseG.results[0].geometry.location.lng;
                let lng3 = longitutude.toFixed(3);
                $(".cityCoord").text(`  (latitute: ${lat3} & longitude: ${lng3})`)
                console.log(`(latitute: ${lat3} & longitude: ${lng3})`);
               

                //using lat and long to get current weather
                let queryURLWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitutude}&APPID=56657235d578c7d8b7f0b5ce07c9c887`

                $.ajax({
                        url: queryURLWeather,
                        method: "GET"
                    })
                    .then(function (responseWeather) {
                        let currentTemp = responseWeather.main.temp; //(0K − 273.15) × 9/5 + 32 = -459.7°F
                        currentTemp = currentTemp - 273.15;
                        currentTemp = currentTemp * 9;
                        currentTemp = currentTemp / 5;
                        currentTemp = currentTemp + 32;
                        currentTemp1 = currentTemp.toFixed(1);
                        $(".currentTempText").text(`  ${currentTemp1}°`);
                        let currentWind = responseWeather.wind.speed;
                        $(".currentwindSpeedText").text(`   ${currentWind} mph`);
                        let currentHumid = responseWeather.main.humidity;
                        $(".currentHumidText").text(`    ${currentHumid} %`);
                    })

                //using lat andd long to get forecast data

                let queryURLForecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat3}&lon=${lng3}&APPID=56657235d578c7d8b7f0b5ce07c9c887`

                $.ajax({
                        url: queryURLForecast,
                        method: "GET"
                    })
                    .then(function (responseForecast) {
                        console.log(responseForecast.list[1].main.temp);





                        // //Generating the weather cards
                        // function cardprocess() {
                            $(".cardDiv").empty();
                            for (i = 1; i < 6; i++) {

                                //making the div for each card and connect the Bootstrap format
                                let $cardSetup = $("<div>");
                                $cardSetup.addClass(weatherCardformat);

                                //formatting and setting the date on the card
                                let futureDate = moment().add(i, "days").format('LL');
                                let $futureDateH6 = $("<h6>");
                                $futureDateH6.text(futureDate);
                                $futureDateH6.addClass(cardTextFormat);
                                $cardSetup.append($futureDateH6);

                                //formatting and setting the image on the card
                                let $futureImage = $("<img>");
                                $futureImage.addClass(cardImgFormat);
                                $cardSetup.append($futureImage);

                                //formatting and setting the temp on the card
                                let futureTemp = responseForecast.list[i].main.temp;
                                futureTemp = futureTemp - 273.15;
                                futureTemp = futureTemp * 9;
                                futureTemp = futureTemp / 5;
                                futureTemp = futureTemp + 32;
                                futureTemp1 = futureTemp.toFixed(1);
                                console.log(futureTemp1);
                                let $futureTempH6 = $("<h6>");
                                $futureTempH6.text(`Temperature: ${futureTemp1}°`);
                                $futureTempH6.addClass(cardTextFormat);
                                $cardSetup.append($futureTempH6);

                                //formatting and setting the humidity on the card
                                let futureHumid = responseForecast.list[i].main.humidity;
                                let $futureHumidH6 = $("<h6>");
                                $futureHumidH6.text(` Humidty: ${futureHumid} %`);
                                $futureHumidH6.addClass(cardTextFormat);
                                $cardSetup.append($futureHumidH6);

                                //putting the card on the page
                                $(".cardDiv").append($cardSetup);
                            };
                        // };

                    });

                //erases the cityInput array and removes buttons from page
                $("#eraseCities").on("click", function () {
                    $("#btnDiv").empty();
                    currentPick = cityInput[0];
                    cityInput = [];
                    window.localStorage.setItem('cityInput', JSON.stringify(cityInput));

                });

            });

    });

});