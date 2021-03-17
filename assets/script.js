var weatherData;


//https://api.openweathermap.org/data/2.5/weather?q=losangeles&units=imperial&appid=b38f2321fa2666ca5f377e831d6efe20

// https://api.openweathermap.org/data/2.5/onecall?lat= {lat} &lon= {lon} &exclude=minutely,hourly,daily,alerts&appid=b38f2321fa2666ca5f377e831d6efe20

// Go Button Event Listener
$('.goBtn').on('click', function () {
    // Grabbing the value from .searchedCity input
    var citySearch = $(".citySearch").val();
    // Concatinating searchedCity with api to create url
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch.replaceAll(" ","+") + "&units=imperial&appid=b38f2321fa2666ca5f377e831d6efe20"
    console.log(url)
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
            //need to make an if statement here for the clouds. if clouds 90 then cloud, if clouds 40 then 🌤️
            // $(".clouds").html(data.name)
            $(".temp").html("Temp: " + data.main.temp +" °F")
            $(".humid").html("Humidity: " + data.main.humidity +" %")
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
                     //have to access the lat and lon then do another "one call" (see line 5) to pull the uv data from that call and place here omg
                     $(".uv").html("UV Index: " + data2.current.uvi)
                     //Dates for 5 day forcast
                     $("#day1").html(moment.unix(data2.daily[1].dt).format("MMM Do, YYYY"))
                     $("#day2").html(moment.unix(data2.daily[2].dt).format("MMM Do, YYYY"))
                     $("#day3").html(moment.unix(data2.daily[3].dt).format("MMM Do, YYYY"))
                     $("#day4").html(moment.unix(data2.daily[4].dt).format("MMM Do, YYYY"))
                     $("#day5").html(moment.unix(data2.daily[5].dt).format("MMM Do, YYYY"))
                     // Day 1 Conditions
                     $("#day1-temp").html(data2.daily[1].temp.day)
                    //  $("#day1-clouds").html(data2.daily[1])
                     $("#day1-humid").html(data2.daily[1].humidity)








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