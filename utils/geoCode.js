const request = require('request');

const geoCode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiY29zbW9zMjIiLCJhIjoiY2s5cWx3enQyMDRqYzNmcWhrMWI5eGtqeCJ9.dMBKcHSurmoGek9N65VIyQ&limit=1`;
	request({ url, json: true }, (err, res, body) => {
		if (err) {
			callback(`Could not get location api`, undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location', undefined);
		} else {
			const data = {
				longitude: body.features[0].center[0],
				lattitude: body.features[0].center[1],
				location: body.features[0].place_name
			};
			callback(undefined, data);
		}
	});
};

module.exports = geoCode;
