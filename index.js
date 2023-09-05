const result = document.querySelector('.result')
const contenedor = document.querySelector('.weather-content')
const header = document.querySelector(".contacto")
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
const Logo = document.getElementById('Logo-Empresa')
const manito = document.getElementById('manito')

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
    const url = `https://api.weatherapi.com/v1/forecast.json?key=6e2e58017387443484a211202231407&q=${city}&days=4&aqi=no`

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
    "Blizzard": "Tormenta de nieve",
    "Patchy rain possible": "Posible lluvia irregular",
    "Thunderstorm": "Tormentas",
    "Light rain": "Lluvia leve",
    "Light rain shower": "Lluvia ligera",
    "Heavy rain": "Lluvia fuerte",
    "Torrential rain": "Lluvia torrencial",
    "Moderate or heavy rain shower": "Lluvia irregular",
    "Mist": "Neblina",
    "Freezing fog": "Neblina helada",
    "Snowy": "Nevado",
    "Patchy heavy snow": "Nieve intensa irregular",
    "Patchy light rain with thunder": "Lluvia irregular con truenos",
    "Light snow": "Nieve ligera",
    "Heavy snow": "Fuertes nevadas",
    "Moderate snow": "Nieve moderada",
    "Moderate or heavy snow showers": "Chubascos de nieve irregulares"
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
        "Blizzard": "/pronostico/iconos/header/heavy-snow.png",
        "Rainy": "/pronostico/iconos/header/lluvioso-con-sol.png",
        "Torrential rain": "/pronostico/iconos/header/fuerte-lluvia.png",
        "Patchy rain possible": "/pronostico/iconos/header/lluvioso-con-sol.png",
        "Thunderstorm": "/pronostico/iconos/header/fuerte-lluvia.png",
        "Heavy rain": "/pronostico/iconos/header/fuerte-lluvia.png",
        "Mist": "/pronostico/iconos/header/neblina.png",
        "Freezing fog": "/pronostico/iconos/header/neblina-helada.png",
        "Patchy light rain with thunder": "/pronostico/iconos/header/lluvioso.png",
        "Moderate or heavy rain shower": "/pronostico/iconos/header/lluvioso.png",
        "Patchy heavy snow": "/pronostico/iconos/header/heavy-snow.png",
        "Snowy": "/pronostico/iconos/header/moderate-snow.png",
        "Light snow": "/pronostico/iconos/header/light-snow.png",
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

    for (let i = 0; i < 3; i++) {
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

    const currentDate = new Date(); // Obtiene la fecha actual
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

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

    // Mostrar el día actual
    const currentDayName = dayNames[currentDate.getDay()];
    const currentDayElement = document.getElementById('nextday1');
    currentDayElement.textContent = currentDayName;

    // Mostrar los dos días siguientes
    for (let i = 1; i < 3; i++) {
        const nextDate = new Date();
        nextDate.setDate(currentDate.getDate() + i);
        const nextDayName = dayNames[nextDate.getDay()];
        const nextDayElement = document.getElementById(`nextday${i + 1}`);
        nextDayElement.textContent = nextDayName;
    }


    if (pais.value === '' && screenWidth > 768) {
        result.style.display = "none"
    } else {
        Logo.style.display = "none"
        result.style.display = "flex"
    }

    if (pais.value === '' && screenWidth < 768) {
        contenedor.style.background = "transparent"
        header.style.background = "transparent"
    } else if (screenWidth < 768) {
        header.style.background = "rgba(29, 53, 87, 0.5)"
        contenedor.style.background = "rgba(29, 53, 87, 0.5)"
    }
}


function showError(message) {
    console.log(message)
    error.style.display = "flex"
}

function cambiaFondo(data, screenWidth) {
    let backgroundImage = "./pronostico/principal.jpg";

    switch (true) {
        case data.forecast.forecastday[0].day.daily_will_it_rain > 0 && data.current.condition.text != "Partly cloudy":
            backgroundImage = screenWidth < 768 ? "/pronostico/lluvioso-celular.jpg" : "/pronostico/lluvioso.jpg";
            break;
        case data.current.temp_c <= 2:
            backgroundImage = screenWidth < 768 ? "/pronostico/frío-celular.jpg" : "/pronostico/nevado.jpg";
            break;
        case data.current.temp_c <= 10 && data.forecast.forecastday[0].day.daily_will_it_rain < 1:
            backgroundImage = screenWidth < 768 ? "/pronostico/helada-celular.jpg" : "/pronostico/frío.jpg";
            break;
        case data.current.condition.text === "Partly cloudy":
            backgroundImage = screenWidth < 768 ? "/pronostico/frío.jpg" : "/pronostico/parcialmente-nublado.jpg";
            break;
        case data.current.temp_c > 10 && data.current.temp_c < 18:
            backgroundImage = screenWidth < 768 ? "/pronostico/fresco-celular.jpg" : "/pronostico/frío.jpg";
            break;
        case data.current.temp_c >= 18 && data.current.temp_c < 25:
            backgroundImage = screenWidth < 768 ? "/pronostico/soleado-celular.jpg" : "/pronostico/soleado.jpg";
            break;
        case data.current.temp_c >= 25:
            backgroundImage = screenWidth < 768 ? "/pronostico/caluroso-celular.jpg" : "/pronostico/caluroso.jpg";
            break;
        default:
            // En caso de que ninguna condición coincida, puedes asignar una imagen predeterminada aquí.
            backgroundImage = "/pronostico/imagen-predeterminada.jpg";
            break;
    }

    document.body.style.backgroundImage = `url('${backgroundImage}')`;
}











