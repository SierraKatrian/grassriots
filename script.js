// https://stackoverflow.com/a/61077325
// const convert_wind_deg = (degrees) => {
//     directions = [
//         'north', 
//         'northeast', 
//         'east', 
//         'southeast', 
//         'south', 
//         'southwest', 
//         'west', 
//         'northwest'
//     ];

//     degrees = degrees * 8 / 360;
//     degrees = Math.round(degrees, 0);
//     degrees = (degrees + 8) % 8

//     return directions[degrees];
// }

const get_weather_data = () => {
    let loader = `<div class="loader"></div>`;

    document.getElementById('results').innerHTML = loader;

    fetch('https://services.grassriots.io/')
    .then(response => response.json())
    .then(function (location) {
        let lat = location.data.lat;
        let lng = location.data.lng;
        let city = location.data.city;
        
        if (typeof lat == 'number' && typeof lng == 'number') {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m`)
            .then(response => response.json())
            .then(function (weather) {
                if (weather.current) {
                    let result = `<h2>The local weather for ${city}</h2>`;
                    result += '<div class="weather-data">';

                    Object.entries(weather.current).forEach(entry => {
                        const [key, value] = entry;
                        
                        result += `<div>
                            <div>
                                <p><strong>${key}</strong></p>
                                <p>${value}</p>    
                            </div>   
                        </div>`;
                    })

                    result += '</div>';
                    document.getElementById('results').innerHTML = result;
                } else {
                    let result = `<h2>Oops! Something went wrong...</h2>`;
                    document.getElementById('results').innerHTML = result;
                }
            })
        } else {
            let result = `<h2>Oops! Something went wrong...</h2>`;
            document.getElementById('results').innerHTML = result;
        }

    })
};
get_weather_data();