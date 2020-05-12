console.log('Client side javascript file is loaded!');

const searchForm = document.querySelector('#searchForm');
const input = document.querySelector('input');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');
const errorp = document.querySelector('#errorp');

searchForm.addEventListener('submit', (e) => {
	let address = input.value;
	e.preventDefault();
	fetch('http://localhost:3000/weather?address=' + address)
		.then((res) => {
			switch (res.ok) {
				case true:
					res.json().then((data) => {
						if (data.error) {
							errorp.textContent = data.error;
							messageOne.textContent = '';
							messageTwo.textContent = '';
						} else {
							errorp.textContent = '';
							messageOne.textContent = 'Location: ' + data.location;
							messageTwo.textContent = 'Forecast: ' + data.foreCast;
						}
					});
					break;

				default:
					const status = res.status;
					throw Error(status + ' an error occured');
					break;
			}
		})
		.catch((err) => console.log(err));
});
