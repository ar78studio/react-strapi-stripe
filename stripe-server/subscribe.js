const express = require('express');
const app = express();
const { resolve } = require('path');
const env = require('dotenv').config({ path: './.env' });
const PORT = 1447;

// const YOUR_DOMAIN = 'http://localhost:1447';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2022-08-01',
});

// enable CORS
const cors = require('cors');
const corsOptions = {
	origin: '*',
};
app.use(cors(corsOptions));

app.use(express.json());
// app.use(userRoutes);

// Use static to serve static assets.
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

// app.get('http://localhost:1447/config', (request, result) => {
// 	result.send({
// 		publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
// 	});
// });

// app.post('/create-subscription', async (req, res) => {
// 	const customerId = req.cookies['customer'];
// 	const priceId = req.body.priceId;

app.post('/create-subscription', async (request, response) => {
	try {
		if (request.method != 'POST') return response.status(400);
		const { name, email, paymentMethod } = request.body;

		// Create a customer
		const customer = await stripe.customers.create({
			// email: '{{CUSTOMER_EMAIL}}',
			// name: '{{CUSTOMER_NAME}}',
			name: name,
			email: email,
			payment_method: paymentMethod,
			// Stripe use default payment method (probably that you set in your dashboard) to deduct your initial payment
			invoice_settings: { default_payment_method: paymentMethod },
		});
		// Create a product
		const product = await stripe.products.create({
			name: 'Vip Safety First Subscription by Artem',
		});
		// Create a subscription
		const subscription = await stripe.subscriptions.create({
			customer: customer.id,
			// Create a product:
			// items: [
			// 	{
			// 		price_data: {
			// 			currency: 'GBP',
			// 			product: product.id,
			// 			unit_amount: 850,
			// 			recurring: {
			// 				interval: 'month',
			// 			},
			// 		},
			// 	},
			// ],
			//
			// USE AN EXISTING PRODUCT FROM THE PRODUCT PRICE API ID
			items: [
				{
					price: 'price_1N8Oz6HfTo5S12kxznMu8sFf',
				},
			],
			payment_settings: {
				// From video
				payment_method_types: ['card'],
				// AUTO PAYMENT METHODS FROM THE PAYMENT ELEMENT TO TRY
				// automatic_payment_methods: {
				// 	enabled: true,
				// },
				save_default_payment_method: 'on_subscription',
			},
			// expand lets us have the client secret
			expand: ['latest_invoice.payment_intent'],
		});
		// Send back the client secret
		response.json({
			message: 'Subscription successful!',
			clientSecret: subscription.latest_invoice.payment_intent.client_secret,
			subscriptionId: subscription.id,
		});
	} catch (error) {
		return response.status(400).send({ error: { message: error.message } });
	}
});

// LISTEN TO THE PORT

app.listen(PORT, () => console.log(`Node server listening at http://localhost:${PORT}`));
