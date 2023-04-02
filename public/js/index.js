////////////////////////////////////////
//          Global Variables          //
////////////////////////////////////////
let pricing_obj =
{
  "base-price": 40,
  "day-modifier": {
    "weekday": 0,
    "weekend": 5,
    "holiday": 5
  },
  "time-of-day-modifier": {
    "morning": 0,
    "afternoon": -5
  },
  "age-modifier": {
    "child": -20,
    "adult": 0,
    "senior": -5
  },
  "season-modifier": {
    "spring": -10,
    "summer": 0,
    "fall": -10,
    "winter": -15
  },
  "play-type-modifier": {
    "nine": -15,
    "eighteen": 0
  },
  "vehicle-modifier": {
    "walking": 0,
    "pull-cart": 3,
    "riding":20
  },
  "rental-modifier": {
    "rental": 20
  }
};
let hour_of_price_change = 13;
let slideIndex = 0;

// Weather Related Data
const apiKey = "dbc3620d4324d602f30f9b34f5494386";
const lat = 41.57721065130889;
const lon= -71.54496673118871;
const exclude = "minutely,hourly,daily";
const units = "imperial";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${apiKey}`;
const updateInterval = 5; // in min
let weatherObj = null;
let timeSinceLast = null;


/////////////////////////////////////////////
//          Function Delcarations          //
/////////////////////////////////////////////

let updateWeatherWidget = function(result) {
  // icon url example: https://openweathermap.org/img/wn/04d@2x.png
  let temp = result.main.temp;
  let condition = result.weather[0].main;
  let icon = result.weather[0].icon;
  $("#temperature-text").text(temp + " °F");
  $("#condition-text").text(condition);
  $("#weather-image").attr("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);

}

let updateWeather = function() {
  // if (Date.now() - timeSinceLast >= updateInterval*60*1000) {
  timeSinceLast = Date.now();
  $.ajax({
    type: "GET",
    url: apiUrl,
    dataType: "json",
    success: function (result, status, xhr) {
      updateWeatherWidget(result);
    },
    error: function (xhr, status, error) {
      alert("Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
    }
    });
  // }
  // console.log(Math.abs(updateInterval*60*1000000 - (Date.now() - timeSinceLast))/1000);
  setTimeout(updateWeather, (Math.abs(updateInterval*60*1000000 - (Date.now() - timeSinceLast)))/1000); 
}

let initializeHeader = function() {
  $(document).on("change", document.querySelector('.theme-switch input[type="checkbox"]'), switchTheme);
  updateWeather();
}

let showSlides = function() {
  let slides = $(".slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("visible");
    slides[i].classList.add("hidden");
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].classList.toggle("hidden");
  slides[slideIndex-1].classList.toggle("visible");
  setTimeout(showSlides, 4000); // Change image every 4 seconds
} 

let switchTheme = function(e) {
  if (e.target.checked) {
    body.classList = 'dark-mode';
  }
  else {
    body.classList = 'light-mode';
  }    
}

let calculateRate = function(day, timeOfDay, season, playType, vehicleType) {
  let typeOfDay = "";
  // calculate whether weekday or weekend
  if (day > 0 && day < 6) {
    typeOfDay = ["weekday"];
  } else {
    typeOfDay = ["weekend"];
  }

  let o = pricing_obj;
  return (o["base-price"] + o["day-modifier"][typeOfDay] + o["time-of-day-modifier"][timeOfDay] + o["season-modifier"][season] + o["play-type-modifier"][playType] + o["vehicle-modifier"][vehicleType]);
}

let setPricingToday = function() {
  let date = new Date();
  let month = date.getMonth()+1;
  let day = date.getDate();
  let year = date.getFullYear();
  var stringDate = (month + "/" + day + "/" + year);
  $('.current-date').text('('+stringDate+')');
  //calculate season
  let season = "";
  if (month > 2 && month < 6) {
    season = "spring";
  } else if (month > 5 && month < 9) {
    season = "summer";
  } else if (month > 8 && month < 12) {
    season = "fall";
  } else {
    season = "winter";
  }
  let dayTimes = ["morning", "afternoon"];
  let playTypes = ["eighteen", "nine"];
  let vehicleTypes = ["riding", "walking"];
  for (let i = 0; i < dayTimes.length; i++) {
    for (let j = 0; j < playTypes.length; j++) {
      for (let k = 0; k < vehicleTypes.length; k++) {
        $(`#${dayTimes[i]}-pricing-list .${playTypes[j]}-${vehicleTypes[k]}-text`).text(calculateRate(day, dayTimes[i], season, playTypes[j], vehicleTypes[k]));
      }
    }
  }
}

let setGeneralPricing = function () {
  $('#general-pricing-list').append(`<li class="general-pricing-list-item">Hello!</li>`);
}

let initializeTeeTimePage = function () {
  let date = new Date();
  let month = date.getMonth()+1;
  let day = date.getDate();
  let year = date.getFullYear();
  var stringDate = (month + "/" + day + "/" + year);
  $('.current-date-full').text(stringDate);
}

////////////////////////////////////////////////////////////
//          Page Initialization & Function Calls          //
////////////////////////////////////////////////////////////

// Run when document is ready & loaded:
$(function() {
  // Initializes header and binds header initialization function to every time the header is changed. 
  initializeHeader();
  // Initializes Slideshow on Homepage
  if ($(".slideshow-container").length > 0) {
    showSlides();
  }
  // Intializes Daily Pricing on Pricing Page
  if ($('#pricing-today')) {
    setPricingToday();
  }
  // Initializes General Pricing on Pricing Page
  if ($('#general-today')) {
    setGeneralPricing();
  }

  if ($('#book-a-tee-time')) {
    initializeTeeTimePage();
  }
});





