// This file is called as Server.
// body-parseer is use to take input text as it is.

// load the express module
const {response} = require('express');
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
// whenever you use body-parser you have to write this line
app.use(bodyParser.urlencoded({ extended: true }));

// '/' - this means home route
app.get('/', (req, res) => {
  // To take html file on to our server
  res.sendFile(__dirname + "/index.html");
});

app.post('/', (req, res) => {
  const location = req.body.cityName;
  const apiKey = "04cb598994864622b8aab1c94ee33d74";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=" +
    apiKey +
    "&units=metric";

  https.get(url, (response) => {
    // to use the data we use on method
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      // console.log(description);

      // If there are multiple send request then we use write method instead of send
      res.write(
        "<h1>The temperature in " +
          location +
          " is " +
          temp +
          " degree celcius</h1>"
      );
      res.write("<p>The weather description is " + description + "</p>");
    });
  });
});

app.listen(3000, () => console.log("our server is running at port 3000"));
