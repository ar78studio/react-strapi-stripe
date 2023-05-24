import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';
import { SingleHeart } from '../../assets';

const stripePromise = loadStripe('pk_test_XEzHA2tiLmSdW9kfczbymQTU');

const SubscriptionPlan = () => {
	const [subscription, setSubscription] = useState(null);
	const [product, setProduct] = useState(null);
	const [price, setPrice] = useState(null);
	const [invoice, setInvoice] = useState(null);

	useEffect(() => {
		const fetchSubscription = async () => {
			try {
				const response = await fetch('http://localhost:1447/get-subscription', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (response.ok) {
					const data = await response.json();
					setSubscription(data.subscription);
				} else {
					console.log('Failed to fetch subscription');
				}
			} catch (error) {
				console.error(error);
			}
		};

		const fetchProduct = async () => {
			try {
				const response = await fetch('http://localhost:1447/get-product', {
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
				const response = await fetch('http://localhost:1447/get-price', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (response.ok) {
					const data = await response.json();
					setPrice(data.price);
				} else {
					console.log('Failed to fetch price');
				}
			} catch (error) {}
		};

		// FETCH INVOICE
		const fetchInvoice = async () => {
			try {
				const response = await fetch('http://localhost:1447/get-invoice', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (response.ok) {
					const data = await response.json();
					setInvoice(data.invoice);
				} else {
					console.log('Failed to fetch invoice');
				}
			} catch (error) {}
		};

		fetchSubscription();
		fetchProduct();
		fetchPrice();
		fetchInvoice();
	}, []);

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
				<section id='planDescription' className='flex flex-col w-full lg:w-1/2 justify-center items-center '>
					<h1 className='text-xl text-buttonColor'>Subscribe to VIP Safety First</h1>

					{/* GET PRICE  */}
					<div>
						{price ? (
							<div className='flex justify-between items-center py-2'>
								<span className='text-3xl text-buttonColor font-semibold'>
									{' '}
									{price.unit_amount / 100 + '0'} {price.currency.toUpperCase()}
								</span>
								<div className='flex flex-col leading-none'>
									<span className='pl-4 text-purple-500'>per </span>
									<span className='pl-4 text-purple-500'>{price.recurring.interval}</span>
								</div>
							</div>
						) : (
							<div>Loading price details...</div>
						)}
					</div>

					{/* GET PRODUCT  */}
					<div>
						{product ? (
							<div>
								<div className='flex justify-between my-4'>
									<div className='flex'>
										<img className='h-8 pr-6' src={SingleHeart} alt='' />
										<p className='font-semibold text-buttonColor'>{product.name}</p>
									</div>
									<div>
										<p className='text-purple-500'>
											{' '}
											{price.unit_amount / 100 + '0'} {price.currency.toUpperCase()} / {price.recurring.interval}
										</p>
									</div>
								</div>
								<p className='text-purple-500'>{product.description}</p>
							</div>
						) : (
							<div>Loading product details...</div>
						)}
					</div>

					{/* GET PRICE  */}
					<div>
						{price ? (
							<div>
								<p className='text-purple-500'>
									{' '}
									Billed at: {price.unit_amount / 100 + '0'} {price.currency.toUpperCase()} / {price.recurring.interval}
								</p>
								<p></p>
							</div>
						) : (
							<div>Loading price details...</div>
						)}
					</div>

					{/* GET INVOICE  */}
					<div>
						{invoice ? (
							<div>
								<p>{invoice.object}</p>
								<p>{invoice.account_name}</p>
								<p></p>
							</div>
						) : (
							<div>Loading invoice details...</div>
						)}
					</div>
				</section>

				<section id='stripePayment' className='w-full p-4 lg:w-1/2 lg:p-10 pt-10 shadow-xl'>
					{subscription ? (
						<Elements stripe={stripePromise}>
							<PaymentForm subscription={subscription} product={product} />
						</Elements>
					) : (
						<div>Loading plan details...</div>
					)}
				</section>
			</div>
		</>
	);
};

export default SubscriptionPlan;
