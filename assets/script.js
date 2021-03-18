var weatherData;
var citySearch;

// Go Button Event Listener
$('.goBtn').on('click', function () {
    // Grabbing the value from .searchedCity input
    var citySearch = $(".citySearch").val();
    // Concatinating searchedCity with api to create url
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch.replaceAll(" ", "+") + "&units=imperial&appid=b38f2321fa2666ca5f377e831d6efe20"
    console.log(url)
// Appending the url to the Search History
    var aTag = $("<a>")
    aTag.attr('href', url);
    aTag.text(citySearch)
    aTag.addClass("list-group-item list-group-item-action")
    $(".searchHistory").append(aTag)
    console.log(aTag);
    
// FIRST FETCH
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            // Not sure I need this below.
            // weatherData = data
            $(".cityName").html(data.name)
            $(".date").html(moment.unix(data.dt).format("MMM Do, YYYY"))
            //Creating an IMG TAG 
            var img = $("<img>")
            var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            img.attr("src", iconurl);
            //Appending the img to li tag
            $(".clouds").append(img)
            $(".temp").html("Temp: " + data.main.temp + " °F")
            $(".humid").html("Humidity: " + data.main.humidity + " %")
            $(".wind").html("Wind speed: " + data.wind.speed + " mph")

            // Concatinating second url for second api call. 
            secondUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + (data.coord.lat) + "&lon=" + (data.coord.lon) + "&units=imperial&exclude=minutely,hourly,alerts&appid=b38f2321fa2666ca5f377e831d6efe20"
            console.log(secondUrl)
           
            // Fetching second api
            fetch(secondUrl)
                .then(function (response2) {
                    return response2.json();
                })
                .then(function (data2) {
                    console.log(data2)

                    //UV Idex
                    $(".uvIndex").html("UV Index: " + data2.current.uvi);
                    if (data2.current.uvi < 3) {
                        $(".uvIndex").addClass("btn-success")
                    }
                    else if (data2.current.uvi > 3 && data2.current.uvi < 6) {
                        $(".uvIndex").addClass("btn-warning")
                    }
                    else {
                        $(".uvIndex").addClass("btn-danger")
                    }
                    
                    //Dates for 5 day forcast
                    $("#day1").html(moment.unix(data2.daily[1].dt).format("MMM Do, YYYY"));
                    $("#day2").html(moment.unix(data2.daily[2].dt).format("MMM Do, YYYY"));
                    $("#day3").html(moment.unix(data2.daily[3].dt).format("MMM Do, YYYY"));
                    $("#day4").html(moment.unix(data2.daily[4].dt).format("MMM Do, YYYY"));
                    $("#day5").html(moment.unix(data2.daily[5].dt).format("MMM Do, YYYY"));
                    $("#day5").html(moment.unix(data2.daily[5].dt).format("MMM Do, YYYY"));
                    
                    // Day 1 Conditions
                    $("#day1-temp").html("Temp: " + data2.daily[1].temp.day + " °F");
                    var img1 = $("<img>")
                    var iconurl = "http://openweathermap.org/img/w/" + data2.daily[1].weather[0].icon + ".png";
                    img1.attr('src', iconurl);
                    $("#day1-clouds").append(img1)
                    $("#day1-humid").html("Humidity: " + data2.daily[1].humidity + " %")
                    if($(".goBtn").click)
                    // $('.goBtn').on('click', function (){
                    //     img1.remove()
                    // }
                    
                    //Day 2 Conditions
                    $("#day2-temp").html("Temp: " + data2.daily[2].temp.day + " °F")
                    var img2 = $("<img>")
                    var iconurl = "http://openweathermap.org/img/w/" + data2.daily[2].weather[0].icon + ".png";
                    img2.attr('src', iconurl);
                    $("#day2-clouds").append(img2)
                    $("#day2-humid").html("Humidity: " + data2.daily[2].humidity + " %")
                    
                    // Day 3 Conditions
                    $("#day3-temp").html("Temp: " + data2.daily[3].temp.day + " °F")
                    var img3 = $("<img>")
                    var iconurl = "http://openweathermap.org/img/w/" + data2.daily[3].weather[0].icon + ".png";
                    img3.attr('src', iconurl);
                    $("#day3-clouds").append(img3)
                    $("#day3-humid").html("Humidity: " + data2.daily[3].humidity + " %")
                    
                    // Day 4 Conditions
                    $("#day4-temp").html("Temp: " + data2.daily[4].temp.day + " °F")
                    var img4 = $("<img>")
                    var iconurl = "http://openweathermap.org/img/w/" + data2.daily[4].weather[0].icon + ".png";
                    img4.attr('src', iconurl);
                    $("#day4-clouds").append(img4)
                    $("#day4-humid").html("Humidity: " + data2.daily[4].humidity + " %")
                    
                    //Day 5 Conditions
                    $("#day5-temp").html("Temp: " + data2.daily[5].temp.day + " °F")
                    var img5 = $("<img>")
                    var iconurl = "http://openweathermap.org/img/w/" + data2.daily[5].weather[0].icon + ".png";
                    img5.attr('src', iconurl);
                    $("#day5-clouds").append(img5)
                    $("#day5-humid").html("Humidity: " + data2.daily[5].humidity + " %")

                })
        });
})



    // var userName = document.createElement('h3');
                // var issueTitle = document.createElement('h4');
                // var issueBody = document.createElement('p');
                // userName.textContent = data[i].user.login;
                // issueTitle.textContent = data[i].title;
                // issueBody.textContent = data[i].body;
                // issueContainer.append(userName);
                // issueContainer.append(issueTitle);
                // issueContainer.append(issueBody);








// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city