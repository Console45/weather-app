const request = require('request');
const geoCode = require('./geoCode');
const foreCast = require('./forecast');

const location = process.argv[2];
if (location) {
	geoCode(`${location}`, (error, locationData) => {
		if (error) {
			return console.log(error);
		}
		foreCast(locationData.lattitude, locationData.longitude, (err, foreCastData) => {
			if (err) {
				return console.log(err);
			}
			console.log(locationData.location);
			console.log(foreCastData);
		});
	});
} else {
	console.log('Please enter a location');
}
