let apiKey = "0c72a8ade7e043c3ed8d065722fc0abd";
let cityName = document.querySelector("#cityname");
let btnElem = document.querySelector("#getcityweather");
let mainDataElem = document.querySelector(".maindata");

let checkWeather = async (city) => {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  try {
    let fetchApi = await fetch(apiUrl);
    if (fetchApi.ok) {
      let data = await fetchApi.json();
      console.log(data);
      return data;
    } else {
      console.error("Failed to fetch data from the API.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    return null;
  }
};
let displayWeather = () => {
  btnElem.addEventListener("click", async () => {
    let city = cityName.value.trim(); // Trim any leading/trailing spaces

    if (city.length > 0) {
      try {
        let data = await checkWeather(city);

        if (data) {
          let divElem = document.createElement("div");
          divElem.className = "weather";
          divElem.innerHTML = `
            <img src="./assests/images/rain.png" class="weather-icon" alt="">
            <h1 class="temp">${data.main.temp}°C</h1>
            <h2 class="city">${data.name}</h2>
            <h3>${data.weather[0].description}</h3>
            <div class="details">
                <div class="col">
                    <img src="./assests/images/humidity.png" alt="">
                    <div class="humidity-details">
                        <p class="humidity">${data.main.humidity}%</p>
                        <p>humidity</p>
                    </div>
                </div>
                <div class="col">
                    <img src="./assests/images/wind.png" alt="">
                    <div class="wind-details">
                        <p class="wind">${data.wind.speed}km/h</p>
                        <p>wind speed</p>
                    </div>
                </div>
            </div>`;
          mainDataElem.innerHTML = ""; // Clear previous results
          mainDataElem.appendChild(divElem);
          cityName.value = ""; // Clear the input field
        } else {
          console.error("No data received from the API.");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Please enter a valid city name.");
    }
  });
  cityName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      btnElem.click();
    }
  });
};
displayWeather();
