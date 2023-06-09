import React, { lazy } from 'react';

// import { Faq, ContactUs } from '../index';
const Faq = lazy(() => import('../help/Faq'));
const ContactUs = lazy(() => import('../help/Faq'));

const Help = () => {
	return (
		<>
			<Faq />
			<ContactUs />
		</>
	);
};

export default Help;
