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

// DISCOUNT COUPONS (PULLED FROM STRIPE WITH THE /GET-COUPONS END POINT BELOW)
const couponMap = {};

// CREATE SUBSCRIPTION
app.post('/create-subscription', async (request, response) => {
	try {
		if (request.method != 'POST') return response.status(400);

		console.log(request.body);
		const { firstName, lastName, email, paymentMethod, couponCode } = request.body;

		// Check if provided coupon code exists in our map
		let stripeCouponId;
		if (couponCode) {
			const upperCouponCode = couponCode.toUpperCase();
			if (!couponMap[upperCouponCode]) {
				return response.status(400).send({ error: { message: 'Invalid coupon code' } });
			} else {
				stripeCouponId = couponMap[upperCouponCode];
				console.log('Stripe Coupon ID: ' + stripeCouponId);
			}
		}

		console.log(`Received coupon code: ${couponCode}`); // Debug line

		// Create a customer
		const customer = await stripe.customers.create({
			// firstName: firstName,
			// lastName: lastName,
			name: `${firstName} ${lastName}`.trim(),
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
			coupon: stripeCouponId || undefined,

			payment_settings: {
				payment_method_types: ['card'],
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

// Fetch active coupons from Stripe and populate couponMap

app.get('/get-coupons', async (req, res) => {
	try {
		if (req.method !== 'GET') return res.status(400);

		const promotionCodes = await stripe.promotionCodes.list({
			active: true,
			limit: 50, // adjust limit as per your needs
		});

		// Clear the existing map
		Object.keys(couponMap).forEach((key) => delete couponMap[key]);

		// Populate couponMap with the active coupon codes
		promotionCodes.data.forEach((code) => {
			// Use the coupon code as the key and the id as the value
			couponMap[code.code] = code.coupon.id;
		});

		const activeCoupons = Object.keys(couponMap);
		console.log(`List of active coupons: ${activeCoupons}`);
		res.json(activeCoupons);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Error retrieving coupons' });
	}
});

// VALIDATE COUPON
app.post('/validate-coupon', async (req, res) => {
	try {
		const { couponCode } = req.body;

		// Check if provided coupon code exists in our map
		if (couponCode && !couponMap[couponCode]) {
			return res.status(400).send({ error: { message: 'Invalid coupon code' } });
		}

		const stripePromotionCodeId = couponMap[couponCode];
		// const stripeCouponId = couponMap[couponCode];

		// Retrieve the promotion code from Stripe
		const promotionCodeFromStripe = await stripe.promotionCodes.retrieve(stripePromotionCodeId);

		// Retrieve the coupon associated with the promotion code
		const couponFromStripe = await stripe.coupons.retrieve(promotionCodeFromStripe.coupon);
		// const couponFromStripe = await stripe.coupons.retrieve(stripeCouponId);

		// Check if the coupon is valid
		if (couponFromStripe.valid && !couponFromStripe.redeem_by && !couponFromStripe.times_redeemed) {
			res.json({ isValid: true, discount: coupon.amount_off || couponFromStripe.percent_off, couponFromStripe });
		} else {
			res.json({ isValid: false, couponFromStripe });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to validate coupon' });
	}
});

// GET DISCOUNTED SUBSCRIPTION INFO
app.get('/subscription/:id', async (request, response) => {
	try {
		console.log('Subscription ID:', request.params.id);

		const subscriptionId = request.params.id;
		const subscription = await stripe.subscriptions.retrieve(subscriptionId, { expand: ['latest_invoice'] });
		response.json(subscription);
	} catch (error) {
		console.error('Error retrieving subscription:', error.message);
		response.status(500).json({ error: 'Failed to retrieve subscription info' });
	}
});

// LISTEN TO THE PORT

app.listen(PORT, () => console.log(`Node server listening at http://localhost:${PORT}`));
