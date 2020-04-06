fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2')


// messageOne.textContent = 'From javaScript'; 



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    getWeather(location)

    messageOne.textContent = 'Loading...';
})
    const getWeather = (location) => {
        fetch(`/weather?address=${location}}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    // console.log(data.error);
                    messageOne.textContent = data.error;
                    messageTwo.textContent = '';

                    // }else if (data.features.length === 0){
                    //     console.log('Unable to find location. Try another sreach' );
                } else {
                    messageOne.textContent = `this is the location ${data.location}`;
                    messageTwo.textContent = `this is the forcast: ${JSON.stringify(data.forcastData)} `;
                    // console.log(data.location);
                    // console.log(data.forcastData);
                }
            })

        })
    }
