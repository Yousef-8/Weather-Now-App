import express from "express";
import axios from "axios"  
//axios allows to call APIs
//JSON to JAvaScript Object conversion is done automatically by Axios, so we don’t need to manually use JSON.parse() or JSON.stringify()
import bodyParser from "body-parser"; // reads data from HTML forms

const port = 3000;
const app = express(); //an express application that listens onm port 3000

const UNSPLASH_ACCESS_KEY = "your UNSPLASH_ACCESS_KEY "; /// Enter your UNSPLASH_ACCESS_KEY  provided by the website after registeration.

/////Middlewares: 
///Application-level middleware: Applied to all incoming requests using app.use()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); ////  Use the public folder for static files.

app.set("view engine", "ejs");



////route handling:
//home-page: initially there is no data, regarding weather  or city image and there ar no errors
app.get("/", (req, res) => {
  res.render("index", { data: null, error: null, cityImage: null });
});

//when the user searches the city name
app.post("/get-data", async (req, res) => {
  const city = req.body.city;  ///eg: if the searched city name is London , req.body.city reads London

  try {


    ///1.)fetching geographical data 
    const geographicalCoordinates_response = await axios.get(  ///Axios makes GET request to an external API — the Open-Meteo Geocoding API(link)
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}` ///the city name is give and latitude and longitude for that city is returned
    );

    const geographicalData = geographicalCoordinates_response.data;
    if (!geographicalData.results || geographicalData.results.length === 0) 
      throw new Error("City not found");


  
  //// The Open-Meteo Geocoding API returns  a JSON object:
  /*{

    "results": [
      {
        "id": 1,
        "name": "Paris",
        "latitude": a,
        "longitude": b,
        "country": "UK"
        
      },
      {
        "id": 2,
        "name": "Paris",
        "latitude": a,
        "longitude": b,
        "country": "France"
    
      }
    ]
  }

  */

  //So, geographicalData.results[0] is one full city object, not just the name.
  const {  latitude, longitude, name, country  } = geographicalData.results[0] ///[0] gives us the first object from the json,



  const weatherResponse = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  const { temperature, windspeed } = weatherResponse.data.current_weather;

  //2.)fetch air quality // 
  // notice here we are providing it the latitude and longitude which we get from previos API so it returns us that air quality from this API
  const airQuality_response = await axios.get(
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5`
  );


  const airQualityData = airQuality_response.data.hourly;
  const pm10 = airQualityData.pm10 ? airQualityData.pm10[0] : "N/A";
  const pm25 = airQualityData.pm2_5 ? airQualityData.pm2_5[0] : "N/A";



  ///3.)fetch city image:
  //we provide it the city and client_id which you get as UNSPLASH_ACCESS_KEY when you register on their website
  const cityImage_response = await axios.get(
    `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}&orientation=landscape&per_page=1`
  );

  /////If there is at least one photo result, use the first photo’s full-size URL. Otherwise, set cityImage to null.
  const cityImage = cityImage_response.data.results.length > 0 ? cityImage_response.data.results[0].urls.full : null; ///provide full size image 

  //combining all information so we can send it to index.ejs:
  const data = { name, country, temperature, windspeed, pm10, pm25 };

  ///Passes the final data and city image to to index.ejs for display:
  res.render("index", { data, error: null, cityImage });
} catch (error) {
  res.render("index", {
    data: null,
    error: "City not found or data unavailable.",
    cityImage: null,
  });
}
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
})












