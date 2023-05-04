// Render Prop
import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { GirlWithPhone } from '../../assets';

// import SignupForm from '../checkout/SignupForm';
import { motion } from 'framer-motion';

const SignUp = () => {
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
			{/* WRAPPER */}
			<div className='flex justify-center items-center p-20 bg-purple-50'>
				{/* IMAGE LEFT COLUMN */}
				<div className='ml-10 invisible lg:visible'>
					<img src={GirlWithPhone} alt='Your Personal Number is Safe with Us' className='' />
				</div>
				{/* FORM RIGHT COLUMN  */}
				<div className='flex flex-col justify-center items-center mx-10'>
					<h1 className='text-buttonColor text-2xl lg:text-4xl pb-10'>Create your VIP Experience</h1>
					<Formik
						initialValues={{
							fullName: '',
							country: '',
							email: '',
							mobile: '',
							desiredCountry: '',
						}}
						validate={(values) => {
							const errors = {};
							if (!values.email) {
								errors.email = 'Required';
							} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
								errors.email = 'Invalid email address';
							}

							if (!values.fullName) {
								errors.fullName = 'Required';
							} else if (values.fullName.length > 30) {
								errors.fullName = 'Full Name combined must not be more than 30 characters';
							} else if (!/^[A-Za-z\s]*$/.test(values.fullName)) {
								errors.fullName = 'Invalid format, use letters only';
							}

							if (!values.mobile) {
								errors.mobile = 'Required';
							} else if (!/^\d+$/.test(values.mobile)) {
								errors.mobile = 'Wrong phone number format, digits only';
							} else if (values.mobile.length > 15) {
								errors.mobile = 'Mobile number max of 15 digits';
							}

							if (!values.country) {
								errors.country = 'Required';
							}

							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
								setSubmitting(false);
							}, 400);
						}}
					>
						{({ isSubmitting }) => (
							<Form className='flex flex-col min-w-fit max-w-full gap-4 '>
								<div className='flex flex-col lg:flex-row gap-6'>
									<div className='flex flex-col'>
										<label className='text-buttonColor' htmlFor='fullName'>
											Name
										</label>
										<Field className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' type='text' name='fullName' id='fullName' />
										<ErrorMessage name='fullName' component='div' />
									</div>
									<div className='flex flex-col'>
										<label className='text-buttonColor' htmlFor='country'>
											Country
										</label>
										<Field className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' name='country' as='select' id='country'>
											<option value=''></option>
											<option value='Spain +34'>Spain +34</option>
											<option value='United Kingdom +44'>United Kingdom +44</option>
											<option value='United States +1'>United States +1</option>
										</Field>
										<ErrorMessage name='country' component='div' />
									</div>
								</div>

								<div className='flex flex-col lg:flex-row gap-6 justify-between'>
									<div className='flex flex-col'>
										<label className='text-buttonColor' htmlFor='email'>
											EMail
										</label>
										<Field className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' type='email' name='email' id='email' />
										<ErrorMessage name='email' component='div' />
									</div>

									<div className='flex flex-col'>
										<label className='text-buttonColor' htmlFor='mobile'>
											Your Mobile Number
										</label>
										<Field className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' type='tel' name='mobile' id='mobile' />
										<ErrorMessage name='mobile' component='div' />
									</div>
								</div>
								<div className='flex flex-col'>
									<label className='text-buttonColor' htmlFor='country'>
										Country of Your New Desired Number
									</label>
									<Field className='bg-purple-200 h-10 rounded-md p-2' name='desiredCountry' as='select' id='desiredCountry'>
										<option value=''>Choose a Country for Your New Number: </option>
										<option value='Spain +34'>Spain +34</option>
										<option value='United Kingdom +44'>United Kingdom +44</option>
										<option value='United States +1'>United States +1</option>
									</Field>
									<ErrorMessage name='desiredCountry' component='div' />
								</div>

								<button className='bg-purple-300 h-10 rounded-md mt-10' type='submit' disabled={isSubmitting}>
									CONTINUE
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default SignUp;
