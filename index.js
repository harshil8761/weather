let w_cityName = document.querySelector('.weather_city');
let w_Dt = document.querySelector('.weather_date_time');
let w_forcast = document.querySelector('.weather_forecast');
let w_icon = document.querySelector('.weather_icon');
let w_temperature = document.querySelector('.weather_temperature');
let weather_min = document.querySelector('.weather_min'); 
let weather_max = document.querySelector('.weather_max');


let weather_feelsLike = document.querySelector('.weather_feelsLike');
let weather_humidity = document.querySelector('.weather_humidity');
let weather_wind = document.querySelector('.weather_wind');
let weather_pressure = document.querySelector('.weather_pressure');
let citySearch = document.querySelector('.weather_search');


//to get full name of cuntry
const getfullName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
}


let dt = 1708667988;
const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const formatter = new Intl.DateTimeFormat('en-US',options);
    return formatter.format(curDate);
}


let city = 'Ahmedabad';
citySearch.addEventListener('submit',(e) => {
    e.preventDefault();
    let cityName = document.querySelector('.city_name');
    city = cityName.value;
    
    weatherData();

    cityName.value = '';
})

const weatherData = async () => {
                                                                                     //enter your apikey           
    const apiUrl = `httpss://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d026d447d0f2e932f1789ba11e4e08f8`;
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
    
        const { main, name, weather, wind, sys, dt } = data;
    
        w_cityName.innerHTML = `${name},${getfullName(sys.country)}`;
        w_Dt.innerHTML = getDateTime(dt);
        w_forcast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
        w_temperature.innerHTML = `${main.temp}&#176`;
        weather_min.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        weather_max.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;
    
        weather_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`;
        weather_humidity.innerHTML = `${main.humidity}%`;
        weather_wind.innerHTML = `${wind.speed}m/s`;
        weather_pressure.innerHTML = `${main.pressure}hPa`;
    } catch (error) {
        console.log(error);
    }
}



document.body.addEventListener('load',weatherData());

