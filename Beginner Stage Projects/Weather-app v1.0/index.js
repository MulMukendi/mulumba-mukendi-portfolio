//This function gets the city from input, the gets the coordinates from the API.

async function convertToCoordinates() {
    const city = document.getElementById("theCity").value.trim();

    if (city.length <= 1) {
        alert(`City name/code is too short.`)
        return;
    }
    try { 
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
            if (!response.ok) throw new Error("");
            
            const data = await response.json();
            const {latitude, longitude} = data?.results[0];
            
            return [latitude, longitude];
            
    } catch (error) {
        alert(`City not found...`);
        return null;
    }
}

async function getWeatherData(obj) {
    try {
        const [latitude, longitude] = obj;
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${latitude}` +
          `&longitude=${longitude}` +
          `&current_weather=true` +
          `&hourly=relative_humidity_2m,precipitation` +
          `&timezone=auto`
        );
        
        if (!response.ok) throw new Error("Can't access resource.");

        const data = await response.json();
       
        const { temperature, windspeed, weathercode } = data?.current_weather;
        console.log(data?.current_weather);

       //So basically get the index of the current hour in the time array
        const now = new Date();
        const currentHour = now.getHours();


        //“Get me the index in this array that matches this time.”
        //“Go through the time array and give me the position (index)
        //where the hour equals the current hour.”
        //“Find the index of the hourly row that matches the current weather timestamp.”
        
        /*better version
            const hourIndex = data.hourly.time.indexOf(
            data.current_weather.time
            );
        */
        
        const hourIndex = data.hourly.time.findIndex(t =>
          new Date(t).getHours() === currentHour
        );

        


        const humidity = data?.hourly?.relative_humidity_2m[hourIndex] ?? 0;
        const precipitation = data?.hourly?.precipitation[hourIndex] ?? 0;
        const code = data?.current_weather?.weathercode;
        return {
            temperature, 
            windspeed, 
            humidity, 
            precipitation, 
            code: weathercode};
        
    } catch (error) {
        alert("Can't access resource.")
        return null;
    }
}


async function displayData(weather){
    const {temperature, windspeed, humidity, precipitation, code} = weather;

    const city = document.getElementById("theCity").value.trim();
    document.getElementById("city-name").textContent = `${city}`;
    document.getElementById("temp").textContent = `${temperature}°`;
    document.getElementById("precipitation").textContent = `${precipitation} mm precipitation`;
    document.getElementById("humidity-value").textContent = `${humidity}%`;
    document.getElementById("wind-speed").textContent = `${windspeed} km/h`;
    const sprite = document.getElementById("weather-sprite");
    
}

function getWeatherDescription(code) {
  const mapping = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    95: "Thunderstorm",
    96: "Thunderstorm with hail"
  };
  return mapping[code] || "Unknown weather";
}

async function init(){
    const coordinates = await convertToCoordinates(); //convert the city to it's coordinates
    if (coordinates==null) return;
    const weather = await getWeatherData(coordinates); //get the weather from those coordinates
    displayData(weather); //display the weather from those coordinates
}