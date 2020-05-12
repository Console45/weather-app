const request = require('request');

const foreCast = (longitude, lattitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=76519d4f25dac6e35c80ff95441e5597&query=${longitude},${lattitude}`;

	request({ url, json: true }, (err, res, body) => {
		if (err) {
			callback('Unable to connect to weather api', undefined);
		} else if (body.error) {
			callback('Please specify the location', undefined);
		} else {
			callback(
				undefined,
				`Its ${body.current.temperature} degrees out, but it feelslike ${body.current.feelslike} degrees`
			);
		}
	});
};

module.exports = foreCast;
