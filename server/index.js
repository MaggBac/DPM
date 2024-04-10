const express = require('express');
const cors = require('cors');
const { getDb, connectToDb } = require('./db');
const path = require('path');
const app = express();

app.use(
	cors({
		origin: '*',
		// origin: [process.env.PORT, process.env.CLIENT_URL, process.env.ENV_URL, process.env.ENV_INT_URL, process.env.INTENTION_URL],
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
		optionsSuccessStatus: 200,
	})
);
// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'index.html'));
// });
app.use(express.json());

let db;

connectToDb((err) => {
	if (!err) {
		app.listen('3000', () => {
			console.log('app listening on port 3000');
		});
		db = getDb();
	}
});


//users
app.get('/env', (req, res) => {
	res.json({
		PORT: process.env.CLIENT_URL,
	});
});

app.get('/users', async (req, res) => {
	try {
		const date = req.query.date;
		const users = await db.collection('users').find({ date: date }).toArray();
		res.status(200).json(users);
	} catch (error) {
		console.error('Error fetching booked hours:', error);
		res.status(500).json({ error: 'Could not fetch the documents' });
	}
});

app.post('/users', (req, res) => {
	const name = req.body.name;
	const hour = req.body.hour;
	const date = req.body.date;
	if (!name) {
		res.status(400).json({ error: 'Imię jest wymagane' });
		return;
	}
	db.collection('users')
		.insertOne({ name: name, hour: hour, date: date })
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((err) => {
			res.status(500).json({ err: 'Could not create new document' });
		});
});

//intention
app.get('/envint', (req, res) => {
	res.json({
		PORT: process.env.INTENTION_URL,
	});
});

app.get('/intention', (req, res) => {
	let intentions = [];

	db.collection('intention')
		.find()
		.forEach((intention) => intentions.push(intention))
		.then(() => {
			res.status(200).json(intentions);
		})
		.catch(() => {
			res.status(500).json({ error: 'Could not fetch the documents' });
		});
});

app.post('/intention', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const intention = req.body.intention;
	if (!email) {
		res.status(400).json({ error: 'Email is required' });
		return;
	}
	db.collection('intention')
		.insertOne({ name: name, email: email, intention: intention })
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((err) => {
			res.status(500).json({ err: 'Could not create new document' });
		});
});

module.exports = app;
