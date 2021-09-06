let now=moment();
var searchName = document.getElementById("searchBar");
var cityState;
const api = {
    key: "d4f706b2c6f6ef8e096d9431aeb3a05a",
    base: "https://api.openweathermap.org/data/2.5/weather?q=",
    geo: "https://api.openweathermap.org/geo/1.0/direct?q=",
    location: "http://open.mapquestapi.com/geocoding/v1/address?key=",
    keyII: "xtH1MCiKNIH0zY0fm8rStMUghTWhnqJI",
    oneCall: "https://api.openweathermap.org/data/2.5/onecall?lat="
}
var localArray= [];
const savedLocal = document.querySelector(".location_history")
var prevSearch=$(".history");


searchName.addEventListener("keypress", setQuery);



document.onload= loadFunct();

placeSearch({
    key: "xtH1MCiKNIH0zY0fm8rStMUghTWhnqJI",
    container: document.querySelector(".searchBar")
});
function setQuery(keyNum) {
    if (keyNum.keyCode == 13) {
        findLocation(searchName.value);
    }
}
$("#btn").click(function () {
    findLocation(searchName.value);
});
$(".history").click(function () {
    findLocation(this.title);
});
$(".clear").click(function () {
    localStorage.clear();
})
function findLocation (query) {
    cityState=query.split(", ");
    // console.log(cityState[0]);
    document.querySelector(".location_city").innerHTML=cityState[0];
    if (typeof cityState[1] != "undefined") {
        // console.log(cityState[1]);
        fetch(`${api.location}${api.keyII}&location=${cityState[0]},${cityState[1]}`)
            .then(latLong => {
                return latLong.json();
            }).then(displayLatLong);
    } else if (typeof cityState[0] != "undefined") {
        fetch(`${api.location}${api.keyII}&location=${cityState[0]}`)
            .then(latLong => {
                return latLong.json();
            }).then(displayLatLong);
    }
}
function displayLatLong (latLong) {
    // console.log(latLong);
    var loc=latLong;
    // console.log(loc.results[0].locations[0].latLng)
    oneCall(loc.results[0].locations[0].latLng.lat, loc.results[0].locations[0].latLng.lng)
}
function oneCall(lat, long) {
    fetch(`${api.oneCall}${lat}&lon=${long}&units=imperial&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayWeather)
}
function displayWeather(weather) {
    // console.log(weather.daily);
    tempGague(weather.current.temp);
    windSpeed(weather.current.wind_speed);
    humidity(weather.current.humidity);
    uvIndex(weather.current.uvi);
    currentWeather(weather.current.weather[0],);
    dateSet(now);
    forecast(weather.daily);
}
function forecast(dailyArray) {   
    // prevIcon = element[i].children[0].children[0].classList[1];
    for (i=0; i<5; i++) {
        // var elementLoc=
        var elem = $(".forecast_day"+i);
        // console.log(elem[0].children[2]);
        prevIcon = elem[0].children[0].children[0].classList[1];
        // console.log(element[i].children[0]);
        console.log(dailyArray[i]);
        var bouncer=dailyArray[i].weather[0].id
        const dayNnite=dailyArray[i].weather[0].icon;
        // console.log(elem.find($(".sun"))[0].children[0])
        elem.find($(".sun"))[0].children[0].setAttribute("title", dailyArray[i].weather[0].description)
        switch (true) {
            case (bouncer < 233):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-thunderstorm")
                
                break;
            case (bouncer < 322):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-drizzle")
                
                break;
            case (bouncer < 505):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-sun-rain")
                
                break;
            case (bouncer < 515):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-hail-mixed")
                
                break;
            case (bouncer < 532):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-moon-rain")
                
                break;
            case (bouncer < 623):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-snow")
                
                break;
            case (bouncer < 702):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-stream")
                
                break;
            case (bouncer < 712):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-smoke")
                
                break;
            case (bouncer < 722):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-smog")
                
                break;
            case (bouncer < 732):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-sun-dust")
                
                break;
            case (bouncer < 742):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-fog")
                
                break;
            case (bouncer < 772):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-smoke")
                
                break;
            case (bouncer < 782):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-volcano")
                
                break;
            case (bouncer < 801):
                if (dayNnite=="01d") {
                    elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-sun")
                    
                } else {
                    elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-moon")
                    
                }
                break;
            case (bouncer < 802):
                if (dayNnite=="02d") {
                    elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-sun-cloud")
                    
                } else {
                    elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-moon-cloud")
                    
                }
                break;
            case (bouncer < 803):
                if (dayNnite=="03d") {
                    elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-sun")
                    
                } else {
                    elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-moon")
                    
                }
                break;
            case (bouncer < 804):
                if (dayNnite=="04d") {
                    elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-clouds-sun")
                    
                } else {
                    elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-clouds-moon")
                    
                }
                break;
            case (bouncer < 805):
                elem.find($(".sun")).find($(".fal")).removeClass(prevIcon).addClass("fa-clouds")
                
                break;
        }
        avgTemp = (dailyArray[i].temp.min+dailyArray[i].temp.max)/2;
        prevIconTemp = elem[0].children[1].children[0].classList[1];
//        console.log(ParseFloat(avgTemp, 2));
        elem.find($(".temp"))[0].children[0].setAttribute("title", avgTemp)
        switch(true) {
            case (avgTemp<37):
//                console.log($(".icon.temp").children);
                elem.find($(".temp")).find($(".fal")).removeClass(prevIconTemp).addClass("fa-temperature-frigid");
                break;
            case (avgTemp<51):
                elem.find($(".temp")).find($(".fal")).removeClass(prevIconTemp).addClass("fa-thermometer-quarter");
                break;
            case (avgTemp<65):
                elem.find($(".temp")).find($(".fal")).removeClass(prevIconTemp).addClass("fa-thermometer-half");
                break;
            case (avgTemp<79):
                elem.find($(".temp")).find($(".fal")).removeClass(prevIconTemp).addClass("fa-thermometer-three-quarters");
                break;
            case (avgTemp>90):
                elem.find($(".temp")).find($(".fal")).removeClass(prevIconTemp).addClass("fa-temperature-hot");
                break;
        }
        var humidity = dailyArray[i].humidity;
        elem.find($(".humid"))[0].children[0].setAttribute("title", humidity);
        switch (true) {
            case (humidity < 20):
                elem.find($(".humid")).find($(".fal")).css("color", "red");
                break;
            case (humidity < 50):
                elem.find($(".humid")).find($(".fal")).css("color", "green");
                break;
            case (humidity <= 100):
                elem.find($(".humid")).find($(".fal")).css("color", "blue");
                break;
        }
        var shades = dailyArray[i].uvi;
        elem.find($(".uvIndex"))[0].children[0].setAttribute("title", shades)
        switch (true) {
            case (shades < 3):
                elem.find($(".uvIndex")).find($(".fal")).css("color", "green");
                break;
            case (shades < 6):
                elem.find($(".uvIndex")).find($(".fal")).css("color", "yellow");
                break;
            case (shades < 8):
                elem.find($(".uvIndex")).find($(".fal")).css("color", "orange");
                break;
            case (shades < 11):
                elem.find($(".uvIndex")).find($(".fal")).css("color", "red");
                break;
            case (shades >= 11):
                elem.find($(".uvIndex")).find($(".fal")).css("color", "purple");
                break;
        }
        var speed = dailyArray[i].wind_speed;
        prevIconSpeed = elem[0].children[4].children[0].classList[1];
        elem.find($(".wind"))[0].children[0].setAttribute("title", speed);
        switch (true) {
            case (speed < 21):
                if (prevIconSpeed == "fa-wind-warning") {
                    elem.find($(".wind")).find($(".fal")).removeClass(prevIconSpeed).addClass("fa-wind");
                }
                elem.find($(".wind")).find($(".fal")).css("color", "green");
                break;
            case (speed < 40):
                if (prevIconSpeed == "fa-wind-warning") {
                    elem.find($(".wind")).find($(".fal")).removeClass(prevIconSpeed).addClass("fa-wind");
                }
                elem.find($(".wind")).find($(".fal")).css("color", "orange");
                break;
            case (speed >= 40):
                elem.find($(".wind")).find($(".fal")).removeClass(prevIconSpeed).addClass("fa-wind-warning");
                elem.find($(".wind")).find($(".fal")).css("color", "red");
                break;
        }
        $(".forecast_icon.date")[i].innerHTML = moment().add(i,"days").format("Do");
    }
}
function ParseFloat(str,val) {
    str = str.toString();
    str = str.slice(0, (str.indexOf(".")) + val + 1); 
    return Number(str);   
}
function dateSet (today) {
    $(".date_day")[0].innerHTML = today.format("dddd");
//    console.log(today);
    $(".date_number")[0].innerHTML = today.format("Do");
    $(".date_month")[0].innerHTML = today.format("MMMM");
    $(".date_year")[0].innerHTML = today.format("YYYY");
}
function currentWeather(idPlease) {
//    console.log(idPlease);
    const bouncer=idPlease.id;
    const dayNnite=idPlease.icon;
    var element=$(".stats_sun");
    prevIcon=element[0].children[0].classList[1];
    switch (true) {
        case (bouncer < 233):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-thunderstorm")
            break;
        case (bouncer < 322):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-drizzle")
            break;
        case (bouncer < 505):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-sun-rain")
            break;
        case (bouncer < 515):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-hail-mixed")
            break;
        case (bouncer < 532):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-moon-rain")
            break;
        case (bouncer < 623):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-snow")
            break;
        case (bouncer < 702):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-stream")
            break;
        case (bouncer < 712):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-smoke")
            break;
        case (bouncer < 722):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-smog")
            break;
        case (bouncer < 732):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-sun-dust")
            break;
        case (bouncer < 742):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-fog")
            break;
        case (bouncer < 772):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-smoke")
            break;
        case (bouncer < 782):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-volcano")
            break;
        case (bouncer < 801):
            if (dayNnite=="01d") {
                element.find($(".fal")).removeClass(prevIcon).addClass("fa-sun")
            } else {
                element.find($(".fal")).removeClass(prevIcon).addClass("fa-moon")
            }
            break;
        case (bouncer < 802):
            if (dayNnite=="02d") {
                element.find($(".fal")).removeClass(prevIcon).addClass("fa-sun-cloud")
            } else {
                element.find($(".fal")).removeClass(prevIcon).addClass("fa-moon-cloud")
            }
            break;
        case (bouncer < 803):
            if (dayNnite=="03d") {
                element.find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-sun")
            } else {
                element.find($(".fal")).removeClass(prevIcon).addClass("fa-cloud-moon")
            }
            break;
        case (bouncer < 804):
            if (dayNnite=="04d") {
                element.find($(".fal")).removeClass(prevIcon).addClass("fa-clouds-sun")
            } else {
                element.find($(".fal")).removeClass(prevIcon).addClass("fa-clouds-moon")
            }
            break;
        case (bouncer < 805):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-clouds")
            break;
    }
}
function uvIndex(sun) {
    const shades=sun;
    var element=$(".icon.uvIndex");
    prevIcon=element[0].children[0].classList[1];
    tempText=element[0].children[1];
    tempText.innerHTML=shades;
    switch (true) {
        case (shades < 3):
            element.find($(".fal")).css("color", "green");
            break;
        case (shades < 6):
            element.find($(".fal")).css("color", "yellow");
            break;
        case (shades < 8):
            element.find($(".fal")).css("color", "orange");
            break;
        case (shades < 11):
            element.find($(".fal")).css("color", "red");
            break;
        case (shades >= 11):
            element.find($(".fal")).css("color", "purple");
            break;
    }
}
function humidity(raiin) {
    const drip=raiin;
    var element=$(".icon.humid");
    prevIcon=element[0].children[0].classList[1];
    tempText=element[0].children[1];
    tempText.innerHTML=drip;
    switch (true) {
        case (drip < 20):
            element.find($(".fal")).css("color", "red");
            break;
        case (drip < 50):
            element.find($(".fal")).css("color", "green");
            break;
        case (drip <= 100):
            element.find($(".fal")).css("color", "blue");
            break;
    }
}
function windSpeed(mph) {
    const speed=mph;
    var element=$(".icon.wind");
    prevIcon=element[0].children[0].classList[1];
    tempText=element[0].children[1];
    tempText.innerHTML=speed;
    switch (true) {
        case (speed < 21):
            if (prevIcon == "fa-wind-warning") {
                element.find($(".fal")).removeClass(prevIcon).addClass("fa-wind");
            }
            element.find($(".fal")).css("color", "green");
            break;
        case (speed < 40):
            if (prevIcon == "fa-wind-warning") {
                element.find($(".fal")).removeClass(prevIcon).addClass("fa-wind");
            }
            element.find($(".fal")).css("color", "orange");
            break;
        case (speed >= 40):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-wind-warning");
            element.find($(".fal")).css("color", "red");
            break;
    }
}
function tempGague(temp) {
    const x = temp;
    var element=$(".icon.temp");
//    console.log(element[0].children[1]);
    prevIcon=element[0].children[0].classList[1];
    tempText=element[0].children[1];
    tempText.innerHTML=x;
    switch(true) {
        case (x<37):
//            console.log($(".icon.temp").children);
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-temperature-frigid");
            break;
        case (x<51):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-thermometer-quarter");
            break;
        case (x<65):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-thermometer-half");
            break;
        case (x<79):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-thermometer-three-quarters");
            break;
        case (x>90):
            element.find($(".fal")).removeClass(prevIcon).addClass("fa-temperature-hot");
            break;
    }
}



$("#butt").click(function(){
    if (searchName.value != "") {
        saveLocal(searchName.value);
    }
});



function saveLocal(element) {
    if (typeof localStorage.getItem("savedPlaces") == "string") {
        var tempArray = JSON.parse(localStorage.getItem("savedPlaces"))
//        // console.log("help"+tempArray);
    } else {
        var tempArray = localArray;
//        // console.log("help me"+tempArray);
    }
    
//    // console.log(tempArray);
    var prevArray=tempArray;
    // tempArray.push(element);
    const pushLocation = (obj) => {
        var flag = 0;
        prevArray.forEach((elem) => {
//            // console.log(elem);
//            // console.log(obj);
            if(obj === elem) {
                flag=1;
            }
        });
        if (flag === 1) {
            return false;
        } else {
            return true;
        }
    }
    if (pushLocation(element)){
        tempArray.push(element);
    }
//    // console.log(tempArray);
    localStorage.setItem("savedPlaces", JSON.stringify(tempArray));
    places = localStorage.getItem("savedPlaces");
//    // console.log(typeof places);
    while (savedLocal.firstChild) {
        savedLocal.removeChild(savedLocal.firstChild);
    }
    

    for (i=0; i<tempArray.length; i++) {
//        // console.log(tempArray.length);
        // if (pushLocation(tempArray[i])) {
            var icon=document.createElement("i");
            icon.setAttribute("class", "fal fa-umbrella-beach history");
            icon.setAttribute("title", tempArray[i]);
            savedLocal.appendChild(icon);
        // }
        
    }
}



function loadFunct(){
    dateSet(now);
    findLocation(searchName.placeholder);
    if (typeof localStorage.getItem("savedPlaces") == "string") {
        var tempArray = JSON.parse(localStorage.getItem("savedPlaces"))
        // console.log("help"+tempArray);
    } else {
        var tempArray = localArray;
        // console.log("help me"+tempArray);
    }
    for (i=0; i<tempArray.length; i++) {
        // console.log(tempArray.length);
        // if (pushLocation(tempArray[i])) {
            var icon=document.createElement("i");
            icon.setAttribute("class", "fal fa-umbrella-beach history");
            icon.setAttribute("title", tempArray[i]);
            savedLocal.appendChild(icon);
        // }
        
    }
}