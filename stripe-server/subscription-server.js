const express = require('express');
const app = express();
const { resolve } = require('path');
const env = require('dotenv').config({ path: './.env' });
const PORT = 1447;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2022-08-01',
});

// enable CORS
const cors = require('cors');
const corsOptions = {
	origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

app.use(express.static(process.env.STATIC_DIR));

app.get('/', (request, result) => {
	const path = resolve(process.env.STATIC_DIR + '/index.html');
	result.sendFile(path);
});

app.get('/config', (request, result) => {
	result.send({
		publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	});
});

app.post('/create-subscription', async (req, res) => {
	const customerId = req.cookies['customer'];
	const priceId = req.body.priceId;

	try {
		const subscription = await stripe.subscriptions.create({
			customer: customerId,
			items: [
				{
					price: priceId,
				},
			],
			payment_behavior: 'default_incomplete',
			payment_settings: { save_default_payment_method: 'on_subscription' },
			expand: ['latest_invoice.payment_intent'],
		});

		res.send({
			clientSecret: subscription.latest_invoice.payment_intent.client_secret,
		});
	} catch (error) {
		return res.status(400).send({ error: { message: error.message } });
	}
});

app.listen(PORT, () => console.log(`Node server listening at http://localhost:${PORT}`));
