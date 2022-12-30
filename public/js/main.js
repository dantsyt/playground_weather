const wForm = document.querySelector('form');
const input = document.querySelector('#input');
const msg_one = document.querySelector('#msg_one');
const msg_two = document.querySelector('#msg_two');

wForm.addEventListener('submit', (event) => {
    event.preventDefault();

    msg_one.textContent = 'Loading...';
    msg_two.textContent = '';

    fetch(`/weather?address=${input.value}`)
        .then((response) => {
            response.json()
                .then((data) => {
                    if (data.error) {
                        return msg_one.textContent = data.error;
                    };
                    msg_one.textContent = data.geoData.location;
                    msg_two.textContent = `The weather in ${data.weatherData.location_name} is ${data.weatherData.description}.\nIt is currently ${data.weatherData.temperature}` + "\u2103" + ` and it feels like ${data.weatherData.feelslike}` + "\u2103" + '.';
                });
        });
});