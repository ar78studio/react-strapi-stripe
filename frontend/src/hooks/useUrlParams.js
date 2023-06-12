import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const useUrlParams = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [cookies, setCookie] = useCookies(['linkParams']);

	useEffect(() => {
		const parseUrlParams = () => {
			let paramsString = '';
			if (searchParams.has('utm_source')) paramsString += `utmSource=${searchParams.get('utm_source')}&`;
			if (searchParams.has('utm_medium')) paramsString += `utmMedium=${searchParams.get('utm_medium')}&`;
			if (searchParams.has('utm_campaign')) paramsString += `utmCampaign=${searchParams.get('utm_campaign')}&`;
			if (searchParams.has('fpr')) paramsString += `fpr=${searchParams.get('fpr')}&`;

			if (paramsString) {
				paramsString = paramsString.slice(0, -1); // Remove the trailing '&'
				paramsString = paramsString.replace(/&/g, ' '); // Replace '&' with spaces
				setCookie('linkParams', paramsString, { path: '/' });
				// Expire cookie after 30 days - optional
				// setCookie('linkParams', paramsString, { path: '/', expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
			}
		};

		parseUrlParams();
	}, [searchParams, setCookie, cookies.linkParams]);

	return { searchParams };
};
