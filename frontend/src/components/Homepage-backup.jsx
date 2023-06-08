import React, { useEffect } from 'react';
import { Hero, WhatIsVip, FeelSafe, AVipPhone, FaqInProduct, ContactUs } from './index';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Create a React Context to store the UTM parameters
const UTMLinkContext = React.createContext();

const Product = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [cookies, setCookie] = useCookies(['utmParams']); // Using 'react-cookie' package

	useEffect(() => {
		// Function to parse the UTM parameters from the URL and store them in a cookie
		const parseUTMParams = () => {
			if (searchParams.has('utm_source') || searchParams.has('utm_medium') || searchParams.has('utm_campaign')) {
				const utmParams = {
					utmSource: searchParams.get('utm_source'),
					utmMedium: searchParams.get('utm_medium'),
					utmCampaign: searchParams.get('utm_campaign'),
				};
				setCookie('utmParams', JSON.stringify(utmParams));
			}
		};

		parseUTMParams();
	}, [searchParams, setCookie]);

	return (
		<UTMLinkContext.Provider value={cookies.utmParams || {}}>
			<Hero />
			<WhatIsVip />
			<FeelSafe />
			<AVipPhone />
			<FaqInProduct />
			<ContactUs />
		</UTMLinkContext.Provider>
	);
};

export default Product;

// Export the UTMLinkContext to make it available for other components to consume
export { UTMLinkContext };
