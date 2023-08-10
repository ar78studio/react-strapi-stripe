import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { SingleHeart } from '../../assets';
import { Formik, Field, Form, ErrorMessage } from 'formik';

// Multilanguage support
import { useTranslation, Trans } from 'react-i18next';

// import location to carry over data from the dataCreateLead from VerifyAxios.jsx
import { useLocation } from 'react-router-dom';

// const stripePromise = loadStripe('pk_test_XEzHA2tiLmSdW9kfczbymQTU');

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const SubscriptionPlan = () => {
	const { t, i18n } = useTranslation();

	// const [subscription, setSubscription] = useState(null);
	const [product, setProduct] = useState(null);
	const [price, setPrice] = useState(null);
	// const [invoice, setInvoice] = useState(null);
	const location = useLocation();

	// STRIPE COUPON CODE
	const [couponCode, setCouponCode] = useState('');
	const [originalPrice, setOriginalPrice] = useState(null);

	// transfering form data from VerifyAxios
	// creating a variable to then use it in PaymentForm component props(embeded all the way down at the end of code). dataToStripeForm is received here from VerifyAxios.jsx
	const { clientData } = location.state;

	// console.log(`From SubscriptionPlan: ${clientData}`);

	// useEffect(() => {
	// const fetchSubscription = async () => {
	// 	try {
	// 		// const response = await fetch(`${import.meta.env.VITE_STRIPE_SERVER}/get-subscription`, {
	// 		const response = await fetch(`${import.meta.env.VITE_STRIPE_SERVER}/get-subscription`, {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		});

	// 		if (response.ok) {
	// 			const data = await response.json();
	// 			setSubscription(data.subscription);
	// 		} else {
	// 			console.log('Failed to fetch subscription');
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

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

	// FETCH PRICE
	const fetchPrice = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_STRIPE_SERVER}/get-price`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				const data = await response.json();
				setPrice(data.price);
				// Set the original price when the price is fetched for the first time.
				if (originalPrice === null) {
					setOriginalPrice(data.price);
				}
			} else {
				console.log('Failed to fetch price');
			}
		} catch (error) {}
	};

	// STRIPE COUPON
	const handleCouponApply = async (couponCode) => {
		if (couponCode) {
			try {
				// Validate the coupon code and get the new total with discount applied
				const response = await fetch(`${import.meta.env.VITE_STRIPE_SERVER}/validate-coupon`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						couponCode,
					}),
				});

				if (response.ok) {
					const data = await response.json();
					if (data.newPrice) {
						setPrice((prevPrice) => ({
							...prevPrice,
							unit_amount: data.newPrice,
						}));
					} else {
						console.error('Error: Server response does not contain a new price.');
					}
				} else {
					console.error('Coupon code is not valid.');
				}
			} catch (error) {
				console.error('Error occurred during fetch operation:', error);
			}
		} else {
			console.error('No coupon code provided.');
		}
	};

	useEffect(() => {
		// fetchSubscription();
		fetchProduct();
		fetchPrice();
		if (couponCode) {
			handleCouponApply(couponCode);
		}
	}, [couponCode]);

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
			<div className='flex flex-col flex-wrap lg:flex-row lg:flex-nowrap px-10 my-10'>
				<section id='planDescription' className='flex flex-col w-full lg:w-1/2 justify-start items-start lg:px-20 pt-20 pb-10'>
					<h1 className='text-xl text-buttonColor font-semibold'>
						{/* Subscribe to VIP Safety First */}
						<Trans i18nKey='stripePaymentTitle'></Trans>
					</h1>

					{/* GET PRICE  */}
					<div className='w-full'>
						{price ? (
							<div className='flex  items-center py-2'>
								<div className='flex justify-start'>
									{/* LARGE PRICE NUMBERS  */}
									<span className='text-3xl text-buttonColor font-semibold'>
										{' '}
										{/* + '0' is for GBP  */}
										{/* {price.unit_amount / 100 + '0'} {price.currency.toUpperCase()} */}
										{/* for EUR  */}
										{price.unit_amount / 100} {price.currency.toUpperCase()}
									</span>
								</div>
								<div className='flex flex-col leading-none'>
									<span className='pl-4 text-purple-500'>
										{/* per  */}
										<Trans i18nKey='per'></Trans>
									</span>
									<span className='pl-4 text-purple-500'>
										{/* <Trans i18nKey='priceInterval'>{price.recurring.interval}</Trans> */}
										<Trans i18nKey='stripePlan.priceInterval'></Trans>
									</span>
								</div>
							</div>
						) : (
							<div>Loading price details...</div>
						)}
					</div>

					{/* GET PRODUCT  */}
					<div>
						{price && product ? (
							<div className=''>
								<div className='flex w-full justify-between items-center my-4'>
									<div className='flex'>
										{/* HEART IMAGE  */}
										<img className='h-8 pr-6' src={SingleHeart} alt='' />
										{/* VIP Safety First  */}
										<p className='font-semibold text-buttonColor'>
											<Trans i18nKey='stripePlan.productName' values={{ productName: product.name }}></Trans>
										</p>
									</div>
									<div>
										{/* PRICE PER MONTH  */}
										<p className='text-purple-500 text-sm'>
											{' '}
											{/* + '0' is for GBP  */}
											{/* {price.unit_amount / 100 + '0'} {price.currency.toUpperCase()} / {price.recurring.interval} */}
											{/* for EUR  */}
											{price.unit_amount / 100} {price.currency.toUpperCase()} /<Trans i18nKey='stripePlan.priceInterval'></Trans>
											{/* {price.recurring.interval} */}
										</p>
									</div>
								</div>
								{/* PRODUCT NAME  */}
								<p className='text-sm text-purple-500'>
									<Trans i18nKey='stripePlan.productName' values={{ productName: product.name }}></Trans>{' '}
								</p>
								{/* PRODUCT DESCRIPTION  */}
								{/* <p className='text-sm text-purple-500'>{product.description}</p> */}
								<p className='text-sm text-purple-500'>
									{/* {t(`stripePlan.productDescr.${product.description}`)} */}
									{product.description}
								</p>
							</div>
						) : (
							<div>Loading product details...</div>
						)}
					</div>

					{/* SUBTOTAL  */}
					<div className='w-5/6 mt-10'>
						{price ? (
							<div className='flex justify-between items-center'>
								<span className='text-buttonColor'>
									{/* Subtotal:  */}
									<Trans i18nKey='stripePlan.subtotal'></Trans>
								</span>
								<span className='text-sm text-purple-500'>
									{/* + '0' is for GBP  */}
									{/* {price.unit_amount / 100 + '0'} {price.currency.toUpperCase()} */}
									{/* for EUR  */}
									{price.unit_amount / 100} {price.currency.toUpperCase()}
								</span>
							</div>
						) : (
							<div>Loading subtotal...</div>
						)}
					</div>

					{/* DISCOUNT CODE OR COUPON  */}
					{/* <Formik>
						<Form className='flex w-full justify-start'>
							COUPON CODE INPUT AND APPLY BUTTON
							<div className='flex justify-start mt-5 flex-col'>
								<label className='text-buttonColor' htmlFor='discCode'>
									If you have a discount code enter it bellow: 
									<Trans i18nKey='discCode'></Trans>
								</label>
								<div>
									<input
										id='discCode'
										className='bg-purple-200 h-10 w-[200px] w-full rounded-md p-2 mr-4'
										type='text'
										placeholder={t('enterCoupon')}
										value={couponCode}
										onChange={(e) => setCouponCode(e.target.value)}
									/>
									<button
										className='bg-buttonColor text-white px-4 py-2 my-4 rounded'
										onClick={(e) => {
											e.preventDefault();
											handleCouponApply(couponCode);
										}}
									>
										Apply
									</button>
								</div>
							</div>
						</Form>
					</Formik> */}

					{/* TAXES  */}
					<div className='w-5/6 mt-5'>
						{price ? (
							<div className='flex justify-between items-center'>
								<span className='text-buttonColor'>IVA: </span>
								<span className='text-sm text-purple-500'>
									{0} {price.currency.toUpperCase()}
								</span>
							</div>
						) : (
							<div>Loading taxes...</div>
						)}
					</div>
					{/* TOTAL  */}
					<div className='w-5/6 mt-5'>
						{price ? (
							<div className='flex justify-between items-center'>
								<span className='text-buttonColor font-bold'>Total: </span>
								<span className='text-sm text-purple-500'>
									{/* + '0' is for GBP  */}
									{/* {price.unit_amount / 100 + '0'} {price.currency.toUpperCase()} */}
									{/* for EUR  */}
									{price.unit_amount / 100} {price.currency.toUpperCase()}
								</span>
							</div>
						) : (
							<div>Loading total...</div>
						)}
					</div>

					{/* GET INVOICE  */}
					{/* <div>
						{invoice ? (
							<div>
								<p>{invoice.object}</p>
								<p>{invoice.account_name}</p>
								<p></p>
							</div>
						) : (
							<div>Loading invoice details...</div>
						)}
					</div> */}
				</section>

				<section id='stripePayment' className='w-full p-4 lg:w-1/2 lg:p-10 pt-10 shadow-xl'>
					<Elements stripe={stripePromise}>
						<PaymentForm product={product} clientData={clientData} couponCode={couponCode} />
					</Elements>
				</section>
			</div>
		</>
	);
};

export default SubscriptionPlan;
