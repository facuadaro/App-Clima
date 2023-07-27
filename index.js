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
const screenWidth = window.innerWidth;
const features = document.querySelector('.features-2')

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
                cambiaFondo(data)
                conditionData(data)
            }
        })
}

const currentDate = new Date(); // Obtiene la fecha actual

const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
const dayNum = currentDate.getDay(); // Obtiene el número del día de la semana (0 para Domingo, 1 para Lunes, etc.)

const dayName = dayNames[dayNum]

console.log(dayName); // Muestra el número del día de la semana correspondiente a la fecha actual

function currentCondition(data) {
    return data.current.condition.text
}

const condicionesTraducidas = {
    "Overcast": "Nublado",
    "Sunny": "Soleado",
    "Moderate rain": "Lluvia Moderada",
    "Partly cloudy": "Parcialmente Nublado",
    "Cloudy": "Despejado",
    "Windy": "Ventoso",
    "Clear": "Despejado",
    "Cold": "Frío",
    "Warm": "Cálido",
    "Hot": "Caluroso",
    "Dry": "Seco",
    "Humid": "Humedo",
    "Patchy light snow": "Nieve ligera irregular",
    "Light freezing rain": "Lluvia helada ligera",
    "Patchy moderate snow": "Nieve ligera moderada",
    "Fog": "Niebla",
    "Foggy": "Neblinoso",
    "Rainy": "Lluvioso",
    "Patchy rain possible": "Posible lluvia irregular",
    "Thunderstorm": "Tormentas",
    "Light rain": "Lluvia leve",
    "Heavy rain": "Lluvia fuerte",
    "Mist": "Neblina",
    "Freezing fog": "Neblina helada",
    "Snowy": "Nevado",
    "Heavy snow": "Fuertes nevadas",
    "Moderate snow": "Nieve moderada",
    "Moderate or heavy snow showers": "Chubascos de nieve moderados o fuertes"
};


function conditionData(data) {
    const iconosClima = {
        "Overcast": "/pronostico/iconos/header/nublado.png",
        "Sunny": "/pronostico/iconos/header/soleado.png",
        "Moderate rain": "/pronostico/iconos/header/lluvioso.png",
        "Cloudy": "/pronostico/iconos/header/parcialmente-nublado.png",
        "Partly cloudy": "/pronostico/iconos/header/parcialmente-nublado.png",
        "Windy": "/pronostico/iconos/header/parcialmente-nublado.png",
        "Clear": "/pronostico/iconos/header/soleado.png",
        "Light rain": "/pronostico/iconos/header/lluvioso-con-sol.png",
        "Light rain shower": "/pronostico/iconos/header/lluvioso-con-sol.png",
        "Cold": "",
        "Warm": "",
        "Hot": "",
        "Dry": "",
        "Humid": "",
        "Patchy light snow": "/pronostico/iconos/header/moderate-snow.png",
        "Light freezing rain": "/pronostico/iconos/header/moderate-snow.png",
        "Patchy moderate snow": "/pronostico/iconos/header/moderate-snow.png",
        "Fog": "/pronostico/iconos/header/niebla.png",
        "Foggy": "/pronostico/iconos/header/neblina.png",
        "Rainy": "/pronostico/iconos/header/lluvioso-con-sol.png",
        "Patchy rain possible": "/pronostico/iconos/header/lluvioso-con-sol.png",
        "Thunderstorm": "/pronostico/iconos/header/fuerte-lluvia.png",
        "Heavy rain": "/pronostico/iconos/header/fuerte-lluvia.png",
        "Mist": "/pronostico/iconos/header/neblina.png",
        "Freezing fog": "/pronostico/iconos/header/neblina-helada.png",
        "Snowy": "/pronostico/iconos/header/moderate-snow.png",
        "Heavy snow": "/pronostico/iconos/header/heavy-snow.png",
        "Moderate snow": "/pronostico/iconos/header/moderate-snow.png",
        "Moderate or heavy snow showers": "/pronostico/iconos/header/moderate-snow.png"
    };
    let condition = document.getElementById('text-condition')
    let iconoConditionPrincipal = document.getElementById('icono-condition-principal')

    const conditionClima = currentCondition(data)

    const conditionTraducida = condicionesTraducidas[conditionClima] || conditionClima;
    condition.textContent = conditionTraducida;

    if (iconosClima.hasOwnProperty(conditionClima)) {
        iconoConditionPrincipal.src = iconosClima[conditionClima]
    } else {
        let err = document.createElement('p')
        err.textContent = "No se encontro un icono"
        console.error(`No se encontró un icono para la condición del clima: ${conditionClima}`);
    }

    if (typeof condition !== 'undefined') {
        condition.textContent = conditionTraducida;
    }

    for (let i = 0; i < 8; i++) {
        let nextdays = data.forecast.forecastday[i].day.condition.text
        let textConditions = document.getElementById(`text-condition${i + 1}`)

        const nextdaysTraducida = condicionesTraducidas[nextdays] || nextdays;
        textConditions.textContent = nextdaysTraducida;

        if (iconosClima.hasOwnProperty(nextdays)) { // Verificamos si la condición del siguiente día está en el objeto iconosClima
            let iconoConditionSecondary = document.getElementById(`icono-condition-secondary${i + 1}`)
            iconoConditionSecondary.src = iconosClima[nextdays]; // Establecemos el icono correspondiente para el siguiente día
        } else {
            console.log("No se encontro un icono para el siguiente dia")
        }

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

    if (pais.value === '' && screenWidth > 768) {
        features.style.display = "none"
    }else{
        features.style.display = "flex"
    }
    
    if(pais.value === '' && screenWidth < 768){
        contenedor.style.background = "transparent"
    }else if(screenWidth < 768){
        contenedor.style.background = "rgba(29, 53, 87, 0.5)"
    }
}


function showError(message) {
    console.log(message)
    error.style.display = "flex"
}

function cambiaFondo(data) {
    if (data.forecast.forecastday[0].day.daily_will_it_rain > 0 && screenWidth > 768) {
        document.body.style.backgroundImage = "url('/pronostico/lluvioso.jpg')"
        return;
    }else if(data.forecast.forecastday[0].day.daily_will_it_rain > 0 && screenWidth < 768){
        document.body.style.backgroundImage = "url('/pronostico/lluvioso-celular.jpg')"
        return;
    }
    if (data.current.temp_c <= 2 && screenWidth > 768) {
        document.body.style.backgroundImage = "url('/pronostico/bajo-cero.jpg')"
        return;
    }else if(data.current.temp_c <= 2 && screenWidth < 768){
        document.body.style.backgroundImage = "url('/pronostico/bajo-cero-celular.jpg')"
        return;
    }
    if (data.current.temp_c <= 10 && data.forecast.forecastday[0].day.daily_will_it_rain < 1 && screenWidth > 768) {
        document.body.style.backgroundImage = "url('/pronostico/helada.jpg')"
        return;
    }else if(data.current.temp_c <= 10 && data.forecast.forecastday[0].day.daily_will_it_rain < 1 && screenWidth < 768){
        document.body.style.backgroundImage = "url('/pronostico/helada-celular.jpg')"
        return;
    }
    if (data.current.temp_c > 10 && data.current.temp_c < 18 && screenWidth > 768) {
        document.body.style.backgroundImage = "url('/pronostico/frío.jpg')"
        return;
    }else if(data.current.temp_c > 10 && screenWidth < 768){
        document.body.style.backgroundImage = "url('/pronostico/frío-celular.jpg')"
        return;
    }
    if (data.current.temp_c >= 18 && data.current.temp_c < 25 && screenWidth > 768) {
        document.body.style.backgroundImage = "url('/pronostico/soleado.jpg')"
        return;
    }else if(data.current.temp_c >= 18 && data.current.temp_c < 25 && screenWidth < 768){
        document.body.style.backgroundImage = "url('/pronostico/soleado-celular.jpg')"
        return;
    }
    if (data.current.temp_c >= 25 && screenWidth > 768) {
        document.body.style.backgroundImage = "url('/pronostico/caluroso.jpg')"
        return;
    }else if(data.current.temp_c >= 25 && screenWidth < 768){
        document.body.style.backgroundImage = "url('/pronostico/caluroso-celular.jpg')"
        return;
    }
}






