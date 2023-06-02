import React from 'react';
import { Hero, WhatIsVip, FeelSafe, AVipPhone, FaqInProduct, ContactUs } from './index';
// Get Cookies and Url Params
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Product = () => {
	// Access url search params
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	return (
		<>
			<Hero />
			<WhatIsVip />
			<FeelSafe />
			<AVipPhone />
			<FaqInProduct />
			<ContactUs />
		</>
	);
};

export default Product;
