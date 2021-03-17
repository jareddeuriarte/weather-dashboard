var weatherData;



// https://api.openweathermap.org/data/2.5/onecall?lat= {lat} &lon= {lon} &exclude=minutely,hourly,daily,alerts&appid=b38f2321fa2666ca5f377e831d6efe20

// Go Button Event Listener
$('.goBtn').on('click', function () {
    // Grabbing the value from .searchedCity input
    var citySearch = $(".citySearch").val();
    // Concatinating searchedCity with api to create url
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch.replaceAll(" ", "") + "&units=imperial&appid=b38f2321fa2666ca5f377e831d6efe20"
    // console.log(url)
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            weatherData = data
            $(".cityName").html(data.name)
            //pull the date, along with the uv index, from the other api call and insert it here, unless someone can figure out how to .
            // // $(".date").html(moment().format('MMMM Do YYYY'))
            // $(".date").html(moment.unix(data.coord.dt).format("MMM Do, YYYY"))
            //need to make an if statement here for the clouds. if clouds 90 then cloud, if clouds 40 then 🌤️
            // $(".clouds").html(data.name)
            $(".temp").html("Temp: " + data.main.temp)
            $(".humid").html("Humidity: " + data.main.temp)
            $(".wind").html("Wind speed: " + data.wind.speed)
            //have to access the lat and lon then do another "one call" (see line 5) to pull the uv data from that call and place here omg
            // $(".uv").html(data.name)      
        });
})






// Not sure i need this. 
// for (var i = 0; i < data.length; i++) {
//     console.log(data[i].main)
// }



    // var userName = document.createElement('h3');
                // var issueTitle = document.createElement('h4');
                // var issueBody = document.createElement('p');
                // userName.textContent = data[i].user.login;
                // issueTitle.textContent = data[i].title;
                // issueBody.textContent = data[i].body;
                // issueContainer.append(userName);
                // issueContainer.append(issueTitle);
                // issueContainer.append(issueBody);




// var issueContainer = document.getElementById('issues');
// var fetchButton = document.getElementById('fetch-button');



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