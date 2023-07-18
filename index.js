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
    const url = `https://api.weatherapi.com/v1/forecast.json?key=6e2e58017387443484a211202231407&q=${city}&days=8&aqi=no`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod === '404') {
                showError('Ciudad no encontrada')
            } else {
                console.log(data)
                showWeather(data)
                nextDaysFunction(data)
            }
        })
}

const currentDate = new Date(); // Obtiene la fecha actual

const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
const dayNum = currentDate.getDay(); // Obtiene el número del día de la semana (0 para Domingo, 1 para Lunes, etc.)

const dayName = dayNames[dayNum]

console.log(dayName); // Muestra el número del día de la semana correspondiente a la fecha actual

function showWeather(data) {
    pais.textContent = data.location.name
    temp.textContent = data.current.temp_c
    tempMax.textContent = data.forecast.forecastday[0].day.maxtemp_c
    tempMin.textContent = data.forecast.forecastday[0].day.mintemp_c
    humidity.textContent = data.current.humidity
    wind.textContent = data.current.wind_kph
    pressure.textContent = data.current.pressure_mb
    feelslike.textContent = data.current.feelslike_c
    if (data && data.forecast.forecastday[0].day.daily_chance_of_rain) {
        rain.textContent = data.forecast.forecastday[0].day.daily_chance_of_rain
    } else {
        rain.textContent = '0.0';
    }

    data.forecast.forecastday.slice(1, 8).forEach((forecast, index) => {
        const dateString = forecast.date;
        const dateObj = new Date(dateString);
        const dayNum = dateObj.getDay();
        const dayName = dayNames[dayNum];
        const days = document.getElementById(`nextday${index + 1}`)
        days.textContent = dayName;
    });
    
    
    
    if (data.forecast.forecastday[0].day.daily_will_it_rain > 0) {
        document.body.style.backgroundImage = "url('/pronostico/lluvioso.jpg')"
        return;
    }
    if (data.current.temp_c <= 10 && data.forecast.forecastday[0].day.daily_will_it_rain < 1) {
        document.body.style.backgroundImage = "url('/pronostico/helada.jpg')"
        return;
    }
    if (data.current.temp_c > 10 && data.current.temp_c < 18) {
        document.body.style.backgroundImage = "url('/pronostico/frío.jpg')"
        return;
    }
    if (data.current.temp_c >= 18 && data.current.temp_c < 25) {
        document.body.style.backgroundImage = "url('/pronostico/soleado.jpg')"
        return;
    }
    if (data.current.temp_c >= 25) {
        document.body.style.backgroundImage = "url('/pronostico/caluroso.jpg')"
        return;
    }
}

function nextDaysFunction (data) {    
    for (let i = 0; i < 8; i++) {
        let temp_max = Math.floor(data.forecast.forecastday[i].day.maxtemp_c)
        let spanMaxElement = document.getElementById(`tempmax${i + 1}`)
        spanMaxElement.textContent = temp_max
        let temp_min = Math.floor(data.forecast.forecastday[i].day.mintemp_c)
        let spanMinElement = document.getElementById(`tempmin${i + 1}`)
        spanMinElement.textContent = temp_min
        let nextWind = Math.floor(data.forecast.forecastday[i].day.maxwind_kph)
        let otherWind = document.getElementById(`datewind${i + 1}`)
        otherWind.textContent = nextWind
    }
}

function showError(message) {
    console.log(message)
    error.style.display = "flex"
}