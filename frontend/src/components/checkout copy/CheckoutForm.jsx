import { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import './form.css';

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);

	// Handle form submition
	// We don't want to let default form submission happen here,
	// which would refresh the page.
	const handleSubmit = async (event) => {
		event.preventDefault();

		// Gard claus to make sure the Stripe and Elements Object are fully initialized
		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsProcessing(true);

		// Handle Payment Confirmation
		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Return back to our site (window.location.origin)
				return_url: `${window.location.origin}/completion`,
			},
			redirect: 'if_required',
		});

		if (error) {
			setMessage(error.message);
		} else if (paymentIntent && paymentIntent.status === 'succeeded ') {
			setMessage('Payment status: ' + paymentIntent.status + 'You are VIP Safe!');
		} else {
			setMessage('Unexpected state');
		}

		setIsProcessing(false);
	};

	return (
		<form id='payment-form' className='justify-center flex flex-col' onSubmit={handleSubmit}>
			<PaymentElement />
			<button className='bg-purple-300 px-6 py-2 mt-6 ' disabled={isProcessing} id='submit'>
				<span id='button-text'>{isProcessing ? 'Processing ... ' : 'Subscribe'}</span>
			</button>

			{/* Show any error or success messages */}
			{message && <div id='payment-message'>{message}</div>}
		</form>
	);
}
