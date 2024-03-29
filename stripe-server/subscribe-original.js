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

// SEND PUBLISHABEL KEY TO FRONTEND
app.get('/config', (request, result) => {
	result.send({
		publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	});
});

// CHECK IF THE USER IS ALREADY SUBSCRIBED

app.post('/check-existing-client', async (req, res) => {
	try {
		const { email } = req.body;

		const customer = await stripe.customers.list({ email: email });
		const clientExists = customer.data.length > 0;

		res.json({ clientExists });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to check existing client' });
	}
});

// CREATE SUBSCRIPTION
app.post('/create-subscription', async (request, response) => {
	try {
		if (request.method != 'POST') return response.status(400);
		const { firstName, lastName, email, paymentMethod } = request.body;

		// Log the received firstName and lastName
		// console.log(`Received firstName: ${firstName}, lastName: ${lastName}`);

		// Create a customer
		const customer = await stripe.customers.create({
			// firstName: firstName,
			// lastName: lastName,
			name: `${firstName} ${lastName}`,
			email: email,
			payment_method: paymentMethod,
			invoice_settings: { default_payment_method: paymentMethod },
		});

		// Create a subscription
		const subscription = await stripe.subscriptions.create({
			customer: customer.id,
			// USE AN EXISTING PRODUCT FROM THE PRODUCT PRICE API ID
			items: [
				{
					// GBP
					// price: 'price_1N8Oz6HfTo5S12kxznMu8sFf',
					// EUR
					price: 'price_1NFdh8HfTo5S12kx2IIvOn4t',
				},
			],
			payment_settings: {
				// From video
				payment_method_types: ['card'],
				save_default_payment_method: 'on_subscription',
				// AUTO PAYMENT METHODS FROM THE PAYMENT ELEMENT TO TRY
				// automatic_payment_methods: {
				// 	enabled: true,
				// },
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

// GET SUBSCRIPTION PLAN DETAILS
// app.get('/get-subscription', async (request, response) => {
// 	try {
// 		if (request.method != 'GET') return response.status(400);
// 		const subId = 'sub_1NAVm3HfTo5S12kxuFje0bbx'; // Replace with your actual plan ID
// 		const subscription = await stripe.subscriptions.retrieve(subId);
// 		response.json({ subscription });
// 	} catch (error) {
// 		console.error(error);
// 		response.status(500).json({ error: 'Failed to retrieve subscription details' });
// 	}
// });

// GET PRODUCT DETAILS
app.get('/get-product', async (request, response) => {
	try {
		if (request.method !== 'GET') return response.status(400);
		const productId = 'prod_NuDPcBmwNwDyAc';
		const product = await stripe.products.retrieve(productId);
		response.json({ product });
	} catch (error) {
		console.error(error);
		response.status(500).json({ error: 'Failed to retrieve product details' });
	}
});

// GET PRICE DETAILS
app.get('/get-price', async (request, response) => {
	try {
		if (request.method !== 'GET') return response.status(400);
		// Prices are created/added inside a particular Stripe Product you want to offer
		// GBP
		// const priceId = 'price_1N8Oz6HfTo5S12kxznMu8sFf';
		// EUR
		const priceId = 'price_1NFdh8HfTo5S12kx2IIvOn4t';

		const price = await stripe.prices.retrieve(`${priceId}`);
		response.json({ price });
	} catch (error) {
		console.error(error);
		response.status(500).json({ error: 'Failed to retrieve price details' });
	}
});

// GET OR CREATE AN INVOICE
// app.get('/get-invoice', async (request, response) => {
// 	try {
// 		if (request.method !== 'GET') return response.status(400);
// 		const invoiceId = 'in_1NAgSdHfTo5S12kx8acehHUN';
// 		const invoice = await stripe.invoices.retrieve(invoiceId);
// 		response.json({ invoice });
// 	} catch (error) {
// 		console.error(error);
// 		response.status(500).json({ error: 'Failed to retrieve invoice details' });
// 	}
// });

// RETRIEVE A COUPON
// const coupon = await stripe.coupons.retrieve('promo_1NQrkwHfTo5S12kx4FC2A0gS');

// VALIDATE COUPON
app.post('/validate-coupon', async (req, res) => {
	try {
		// const { couponCode } = req.body;

		// Retrieve the coupon from Stripe
		// const coupon = await stripe.coupons.retrieve(couponCode);
		const coupon = await stripe.coupons.retrieve('promo_1NQrkwHfTo5S12kx4FC2A0gS');

		// Check if the coupon is valid
		if (coupon.valid && !coupon.redeem_by && !coupon.times_redeemed) {
			res.json({ isValid: true, discount: coupon.amount_off || coupon.percent_off });
		} else {
			res.json({ isValid: false });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to validate coupon' });
	}
});

// LISTEN TO THE PORT

app.listen(PORT, () => console.log(`Node server listening at http://localhost:${PORT}`));
