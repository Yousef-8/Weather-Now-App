#  City Weather and Air Quality application
A web page built by using Node.js and Express. It displays real-time air quality and weather data for any city worldwide. Multiple REST APIs are used to fetch such live environmental data.


## **Features**:
Current Weather — real time temperature and wind speed 
Air Quality — PM10 and PM2.5 levels
Dynamic Background — city image fetched from Unsplash API Responsive Design — centered and user-friendly interface

## **Technologies**:

- **Node.js** — backend runtime
- **Express.js** — server framework
- **EJS** — templating engine
- **Axios** — for calling external REST APIs
- **HTML and CSS** — for User Interface design


## **APIs Used**:
- Open-Meteo Geocoding API:
For fetching geographical data(latitude and longitude).
https://open-meteo.com/en/docs/geocoding-api

- Open-Meteo Weather API:
For gaining weather temperature and windspeed.
https://open-meteo.com/en/docs

- Open-Meteo Air Quality API:
It provides some details about air quality.
https://open-meteo.com/en/docs/air-quality-api

- Unsplash Image API:
It provides the beautiful high quality images for the searched city.
https://unsplash.com/documentation





## **Instructions**:
**1.) Clone the repository:**

```
git clone https://github.com/Yousef-8/Weather_Now_App
``` 

```
cd Weather_Now_App
```

**2.) Install dependencies:**

```
 npm install
```

**3.) Run the server:**

```
nodemon index.js
```
Then open your browser and type  http://localhost:3000


## **Note**:
Make sure you register on 
Unsplash Developers(https://unsplash.com) and gain an access key. Store the access key in UNSPLASH_ACCESS_KEY variable in the index.js file.


## **Author*
Yousef
