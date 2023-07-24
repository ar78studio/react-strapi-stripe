// ConfirmationPage.jsx
import React, { useEffect, useState } from 'react';

function DiscountApplied({ subscriptionId }) {
	const [subscription, setSubscription] = useState(null);

	useEffect(() => {
		const fetchSubscription = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_STRIPE_SERVER}/subscription/${subscriptionId}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setSubscription(data);
			} catch (error) {
				console.error('Failed to fetch subscription', error);
			}
		};

		fetchSubscription();
	}, [subscriptionId]);

	if (!subscription) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Subscription Confirmation</h1>
			<p>Thank you for your subscription!</p>
			<p>Plan: {subscription.plan?.nickname}</p>
			<p>
				Price: {subscription.plan?.amount / 100} {subscription.plan?.currency?.toUpperCase()}
			</p>
			<p>Discount applied: {subscription.discount ? `${subscription.discount.coupon.percent_off}% off` : 'None'}</p>
			<p>
				Latest Invoice: {subscription.latest_invoice.payment_intent?.amount / 100} {subscription.latest_invoice.payment_intent?.currency?.toUpperCase()}
			</p>
		</div>
	);
}

export default DiscountApplied;
