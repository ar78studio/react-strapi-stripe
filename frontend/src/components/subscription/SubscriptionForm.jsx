import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

export default function SubscriptionForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [errorMessage, setErrorMessage] = useState();
	const [loading, setLoading] = useState(false);

	const handleError = (error) => {
		setLoading(false);
		setErrorMessage(error.message);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe) {
			return;
		}

		setLoading(true);

		const { error: submitError } = await elements.submit();
		if (submitError) {
			handleError(submitError);
			return;
		}

		const res = await fetch('/create-subscription', {
			method: 'POST',
		});
		const { clientSecret } = await res.json();

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: 'https://example.com/order/123/complete',
			},
		});

		if (error) {
			handleError(error);
		} else {
			// Handle successful payment or redirect logic here
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement />
			<button type='submit' disabled={!stripe || loading}>
				Submit Payment
			</button>
			{errorMessage && <div>{errorMessage}</div>}
		</form>
	);
}
