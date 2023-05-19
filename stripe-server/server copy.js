const express = require('express');
const app = express();
const { resolve } = require('path');
// Replace if using a different env file or config
const env = require('dotenv').config({ path: './.env' });
const PORT = 1447;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2022-08-01',
});

// The bellow code (const cors = ... ) was added because of the following error in the console:
// Access to fetch at 'http://localhost:1447/create-payment-intent' from origin 'http://localhost:5173' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
// chatGPT suggested this:
// This error message indicates that you are trying to make a cross-origin request from your React frontend running on http://localhost:5173 to your backend API running on http://localhost:1447, but the server is not allowing the request due to a missing or incorrect Access-Control-Allow-Origin header.

// To fix this issue, you need to configure your backend server to include the Access-Control-Allow-Origin header in the response with the correct value to allow cross-origin requests from your frontend.

// One way to do this in your Node.js/Express server is to use the cors middleware. You can install it using npm install cors and then add the following code to your server.js file:

// const cors = require('cors');

// enable CORS
// app.use(cors());

// This will allow cross-origin requests from any origin by setting the Access-Control-Allow-Origin header to *. If you want to restrict the origins that are allowed to make requests, you can pass an options object to the cors() function. For example, to allow requests only from http://localhost:5173, you can use:

// const corsOptions = {
// 	origin: 'http://localhost:5173',
// };
// app.use(cors(corsOptions));

//Make sure to restart your server after making these changes.

// enable CORS
const cors = require('cors');
const corsOptions = {
	origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

// CORS (Cross-Origin Resource Sharing) is a mechanism that allows web pages to access resources from different domains. When a web page tries to access a resource from a different domain, a CORS policy is enforced by the browser to determine if the request should be allowed or not.

// CORS middleware is a server-side software component that helps to handle CORS-related issues by adding the required CORS headers to HTTP responses. The middleware intercepts incoming requests and checks if the request is allowed based on the specified CORS policy. If the request is allowed, the middleware adds the necessary headers to the response to allow the browser to access the requested resource. If the request is not allowed, the middleware returns an error response to the client.

// Using a CORS middleware in your server-side code can help you manage CORS-related issues and provide a secure way to access resources from different domains.

// +++++++++++++++++++++++++++++++++++++++++++

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

app.post('/create-payment-intent', async (request, result) => {
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			currency: 'eur',
			amount: 1999,
			automatic_payment_methods: {
				enabled: true,
			},
		});

		result.send({ clientSecret: paymentIntent.client_secret });
	} catch (errors) {
		return result.status(400).send({
			error: {
				message: errors.message,
			},
		});
	}
});

app.listen(PORT, () => console.log(`Node server listening at http://localhost:${PORT}`));
