const result = document.querySelector('.result')
const contenedor = document.querySelector('.weather-content')
const form = document.querySelector('.get-weather')
const nameCity = document.getElementById('city')
const nameCountry = document.getElementById('country')
const error = document.getElementById('error')
const temp = document.getElementById('temp')
const tempMax = document.getElementById('max')
const tempMin = document.getElementById('min')
const pais = document.getElementById('pais')
const pedidoCyP = document.querySelector('.pedidoCyP')
const humidity = document.getElementById('humidity')
const rain = document.getElementById('rain')
const pressure = document.getElementById('pressure')
const feelslike = document.getElementById('feels_like')
const wind = document.getElementById('wind')
const fmax = document.querySelector('.forecast-max')
const fmin = document.getElementById('forecast-min')


form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (nameCity.value === '') {
        showError("Debe completar todos los campos")
        pedidoCyP.style.display = "flex"
    } else {
        console.log(nameCity.value)
        error.style.display = "none"
        callAPI(nameCity.value)
        pedidoCyP.style.display = "none"
    }
})


function callAPI(city) {
    const apiId = '31d97553eea8431b5f769cda1b7ada51'
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lon=${country}&units=metric&appid=${apiId}`
    const url = `https://api.weatherapi.com/v1/forecast.json?key=6e2e58017387443484a211202231407&q=${city}&days=3&aqi=no`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod === '404') {
                showError('Ciudad no encontrada')
            } else {
                console.log(data)
                showWeather(data)
            }
        })
}



function showWeather(data) {
    pais.textContent = data.location.name
    temp.textContent = data.current.temp_c
    tempMax.textContent = data.forecast.forecastday[0].day.maxtemp_c
    tempMin.textContent = data.forecast.forecastday[0].day.mintemp_c
    humidity.textContent = data.current.humidity
    for (let i = 0; i < 3; i++) {
        let temp_max = data.forecast.forecastday[i].day.maxtemp_c;
        let spanMaxElement = document.getElementById(`tempmax${i + 1}`);
        spanMaxElement.textContent = temp_max
    }
    for (let i = 0; i < 3; i++) {
        let temp_min = data.forecast.forecastday[i].day.mintemp_c;
        let spanMinElement = document.getElementById(`tempmin${i + 1}`);
        spanMinElement.textContent = temp_min
    }
    for (let i = 0; i < 3; i++) {
        let nextWind = data.forecast.forecastday[i].day.maxwind_kph;
        let otherWind = document.getElementById(`datewind${i + 1}`);

        otherWind.textContent = nextWind
    }
    for (let i = 0; i < 3; i++) {
        let nextday = data.forecast.forecastday[i].date;
        let days = document.getElementById(`nextday${i + 1}`);
        days.textContent = nextday
    }
    if (data && data.forecast.forecastday[0].day.daily_chance_of_rain) {
        rain.textContent = data.forecast.forecastday[0].day.daily_chance_of_rain;
        // document.body.style.backgroundImage = "url('/pronostico/lluvioso.jpg')"
    } else {
        // Si no existe la propiedad o es falsa, puedes realizar alguna otra acción o dejarlo vacío.
        rain.textContent = '0.0';
    }
    wind.textContent = data.current.wind_kph
    pressure.textContent = data.current.pressure_mb
    feelslike.textContent = data.current.feelslike_c
    if (data.current.temp_c <= 12) {
        document.body.style.backgroundImage = "url('/pronostico/Nevado.jpg')"
    } else if (data && data.forecast.forecastday[0].day.daily_chance_of_rain) {
        document.body.style.backgroundImage = "url('/pronostico/lluvioso.jpg')"
    } else {
        document.body.style.backgroundImage = "url('/pronostico/soleado.jpg')"
    }
}

function showError(message) {
    console.log(message)
    error.style.display = "flex"
}