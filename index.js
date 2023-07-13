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

function callAPI(city, country) {
    const apiId = '31d97553eea8431b5f769cda1b7ada51'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lon=${country}&units=metric&appid=${apiId}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod === '404') {
                showError('Ciudad no encontrada')
            } else {
                console.log(data.main.temp)
                showWeather(data)

            }
        })
}



function showWeather(data) {
    pais.textContent = data.name
    temp.textContent = data.main.temp
    tempMax.textContent = data.main.temp_max
    tempMin.textContent = data.main.temp_min
    humidity.textContent = data.main.humidity
    if (data.rain && data.rain['1h']) {
        rain.textContent = data.rain['1h'];
        // document.body.style.backgroundImage = "url('/pronostico/lluvioso.jpg')"
    } else {
        // Si no existe la propiedad o es falsa, puedes realizar alguna otra acción o dejarlo vacío.
        rain.textContent = '0.0';
    }
    wind.textContent = data.wind.speed
    pressure.textContent = data.main.pressure
    feelslike.textContent = data.main.feels_like
    if (data.main.temp <= 12) {
        document.body.style.backgroundImage = "url('/pronostico/Nevado.jpg')"
    }else if(data.rain && data.rain['1h']){      
            document.body.style.backgroundImage = "url('/pronostico/lluvioso.jpg')"
    }else{
        document.body.style.backgroundImage = "url('/pronostico/soleado.jpg')"
    }
}

function showError(message) {
    console.log(message)
    error.style.display = "flex"
}