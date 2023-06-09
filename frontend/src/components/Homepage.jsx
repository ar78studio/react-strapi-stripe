import React, { lazy } from 'react';
// import { Hero, WhatIsVip, FeelSafe, AVipPhone, FaqInProduct, ContactUs } from './index';
// useUrlParams custom hook gathers UTM and FPR params
import { useUrlParams } from '../hooks/useUrlParams';

const Hero = lazy(() => import('./product/Hero'));
const WhatIsVip = lazy(() => import('./product/WhatIsVip'));
const FeelSafe = lazy(() => import('./product/FeelSafe'));
const AVipPhone = lazy(() => import('./product/AVipPhone'));
const FaqInProduct = lazy(() => import('./product/FaqInProduct'));
const ContactUs = lazy(() => import('./product/ContactUs'));

const Product = () => {
	useUrlParams();
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
