const path = require('path');
const express = require('express');
const geoCode = require('./utils/geoCode');
const foreCast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, 'public');
const viewPath = path.join(__dirname, 'templates');

app.set('view engine', 'ejs');
app.set('views', viewPath);

// static Assets
app.use(express.static(publicDirectoryPath));

// Routes
app.get('/', (req, res) => {
	const title = 'Weather';
	const name = 'Cosmos Appiah';
	res.render('index', { title, name });
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Cosmos Appiah'
	});
});
app.get('/help', (req, res) => {
	const helpText = 'This page is very helpful';
	const title = 'Help';
	const name = 'Cosmos Appiah';

	res.render('help', { helpText, title, name });
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You need to enter an address'
		});
	}
	let location = req.query.address;

	geoCode(`${location}`, (error, locationData) => {
		if (error) {
			return res.send({ error });
		}
		foreCast(locationData.lattitude, locationData.longitude, (error, foreCastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				location: locationData.location,
				foreCast: foreCastData,
				address: req.query.address
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404page', {
		title: '404',
		status: '',
		message: 'Help article not found.',
		name: 'Cosmos Appiah'
	});
});
app.get('*', (req, res) => {
	const status = res.status(404).statusCode;
	const title = '';
	const message = 'Page not found.';
	const name = 'Cosmos Appiah';
	res.render('404page', { status, title, message, name });
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
