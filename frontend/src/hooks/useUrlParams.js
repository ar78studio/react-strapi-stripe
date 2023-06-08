import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const useUrlParams = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const [cookies, setCookie] = useCookies(['linkParams']);

	useEffect(() => {
		const parseUrlParams = () => {
			let params = {};
			if (searchParams.has('utm_source')) params.utmSource = searchParams.get('utm_source');
			if (searchParams.has('utm_medium')) params.utmMedium = searchParams.get('utm_medium');
			if (searchParams.has('utm_campaign')) params.utmCampaign = searchParams.get('utm_campaign');
			if (searchParams.has('fpr')) params.fpr = searchParams.get('fpr');
			if (Object.keys(params).length > 0 && !cookies.linkParams) setCookie('linkParams', JSON.stringify(params), { path: '/' });
		};

		parseUrlParams();
	}, [searchParams, setCookie, cookies.linkParams]); // Added 'cookies.linkParams' to the dependency array

	return { searchParams };
};
