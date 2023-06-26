import React from 'react';
import { Hero, WhatIsVip, FeelSafe, AVipPhone, FaqInProduct, ContactUs } from './index';
import ScrollToTop from './ScrollToTop';
// useUrlParams custom hook gathers UTM and FPR params
import { useUrlParams } from '../hooks/useUrlParams';

const Product = () => {
	useUrlParams();
	return (
		<>
			<ScrollToTop />
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
