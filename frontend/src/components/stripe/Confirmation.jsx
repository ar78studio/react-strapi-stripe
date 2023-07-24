import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import Button from '../buttons/Button';
import DiscountApplied from './DiscountApplied';
// Multilanguage support
import { useTranslation, Trans } from 'react-i18next';

const Confirmation = () => {
	// Multilang support
	const { t, i18n } = useTranslation();

	// get profileNumber from PaymentForm - which is the Customer's new phone number
	const location = useLocation();
	const profileNumber = location.state?.profileNumber || 'Not Available';

	// console.log(location.state);

	// Discounted Subscription
	const [subscription, setSubscription] = useState(null);
	// Display Product name in confirmation
	const [product, setProduct] = useState(null);

	const subscriptionId = location.state?.subscriptionId || 'Not Available';

	const fetchProduct = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_STRIPE_SERVER}/get-product`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				const data = await response.json();
				setProduct(data.product);
			} else {
				console.log('Failed to fetch product');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const fetchSubscription = async () => {
		try {
			console.log(`This is subscription id: ${subscriptionId}`);
			const response = await fetch(`${import.meta.env.VITE_STRIPE_SERVER}/subscription/${subscriptionId}`);
			console.log(response);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			setSubscription(data);
		} catch (error) {
			console.error('Failed to fetch subscription', error);
		}
	};

	useEffect(() => {
		fetchProduct();
		fetchSubscription();
	}, [subscriptionId]);

	if (!subscription) {
		return <div>Loading...</div>;
	}

	// Calculating discounted price:

	let discountRate = subscription.discount ? subscription.discount.coupon.percent_off : 0;
	let originalPrice = subscription.plan?.amount / 100;
	let discountedPrice = originalPrice - originalPrice * (discountRate / 100);

	return (
		<>
			{/* DARK BAR UNDER MENU  */}
			<motion.div
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 1 }}
				variants={{
					hidden: { opacity: 1, y: 30 },
					visible: { opacity: 1, y: 0 },
				}}
			>
				<div className='w-full flex-row bg-underNavBar p-3'></div>
			</motion.div>
			<section className='flex justify-center'>
				{/* PROFILE NUMBER  */}
				<div className='flex flex-col justify-center items-center p-10 bg-purple-300 m-10 lg:w-[700px] rounded-lg'>
					<h1 className='text-2xl lg:text-4xl text-center text-buttonColor'>
						{/* Your Subscription is Confirmed  */}
						<Trans i18nKey='confirmationTitle'></Trans>
					</h1>
					{/* SUBSCRIPTION ID  */}
					<div className='pt-10'>
						<p className='text-md text-buttonColor text-lg font-semibold'>
							Plan: <Trans i18nKey='stripePlan.productName' values={{ productName: product.name }}></Trans>
						</p>

						<p className='text-md text-buttonColor text-lg font-semibold'>
							Price per month: {discountedPrice.toFixed(2)} {subscription.plan?.currency?.toUpperCase()}
						</p>
						<p className='text-md text-buttonColor text-lg font-semibold'>
							Discount applied: {subscription.discount ? `${subscription.discount.coupon.percent_off}% off` : 'None'}
						</p>
					</div>
					<span className='pt-10 text-xl text-center text-buttonColor'>
						{/* Your new Phone number is:  */}
						<Trans i18nKey='newNumber'></Trans>
					</span>
					<span className='bg-purple-600 p-4 rounded-lg mt-4 mb-10 text-4xl text-white'>{profileNumber ? profileNumber : 'Not available'}</span>

					{/* <h4 className='text-center text-lg text-white font-semibold'>You can download an app for your Android Phone here:</h4> */}
					<a className='text-md text-buttonColor text-lg font-semibold hover:text-white' target='_blank' href='https://play.google.com/store/apps/details?id=net.riptec.conxhub'>
						{' '}
						{/* Download Android APP */}
						<Trans i18nKey='android'></Trans>
					</a>
					{/* <h4 className='text-center text-lg text-white font-semibold'>You can download an app for your iPhone here:</h4> */}
					<a className='text-md text-buttonColor text-lg font-semibold hover:text-white' target='_blank' href='https://apps.apple.com/es/app/conxhub/id1444346672'>
						{/* Download iOS iPhone APP */}
						<Trans i18nKey='iOS'></Trans>
					</a>
				</div>
				{/* <DiscountApplied /> */}
			</section>
		</>
	);
};

export default Confirmation;
