//formating the weather card
//initial variable setting

//defining the formating class strings
let weatherCardformat = "weathercard col-sm-2 m-2";
let cardDateTextFormat = "cardText cardDate";
let cardImgFormat = "Img-fluid";
let cardTextFormat = "cardText";

//calculated variables needed (temporary)
let futureDateCalc = dateToday + 1;
let futureDateWeatherURL = "./assets/images/sunny.gif"
let FutureTempValue = "98";
let futureHumidValue = "60"

//looping through the days
function futureDateLoop() {
    for (i=1; i<6; i++) {
        futureDateCalc = dateToday + i;
        futureDateWeatherURL = "./assets/images/sunny.gif"
    }
}


//making the future date
function futureDate() {
    let futureDateH5 = $("<h5>");
    futureDateH5.text(futureDateCalc);
    futureDateH5.addClass(cardDateTextFormat);
};

//making the future image
function futureImg() {
    let futureDateImg = $("<img>");
    futureDateImg.attr("src", futureDateWeatherURL);
    futureDateImg.addClass(cardImgFormat);
};

//making the future temperature
function futureTemp() {
    futureTempCalc =`Temperature: ${futureTempValue}°`;
    let futureTempH6 = $("<h6>");
    futureTempH6.text(futureTempCalc);
    futureDateH5.addClass(cardTextFormat);
};

//making the future humidity
function futureHumid() {
    futureHumidCalc = `Humidity: ${futureHumidValue}%`;
    let futureHumidH6 = $("<h6>");
    futureHumidH6.text(futureHumidCalc);
    futureHumidH5.addClass(cardTextFormat);
};

//constructing the card div
function makeCard() {
    let cardSetup = $("<div>");
    $(this).append(futureDateH5);
    $(this).append(futureImage);
    $(this).append(futureTemp);
    $(this).append(futureHumid);
    $(".cardDiv").append(cardSetup);
};


