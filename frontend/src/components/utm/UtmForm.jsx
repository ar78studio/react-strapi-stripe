import React, { useEffect, useState } from 'react';

const UTMForm = () => {
	const [utmParams, setUTMParams] = useState({});

	useEffect(() => {
		// Function to parse the UTM parameters from the URL
		const parseUTMParams = () => {
			const params = {};
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);

			// Check if the URL contains UTM parameters
			if (urlParams.has('utm_source') || urlParams.has('utm_medium') || urlParams.has('utm_campaign')) {
				params.utmSource = urlParams.get('utm_source');
				params.utmMedium = urlParams.get('utm_medium');
				params.utmCampaign = urlParams.get('utm_campaign');

				// Set the UTM parameters in the cookie
				document.cookie = `utmParams=${JSON.stringify(params)}`;
			}
		};

		parseUTMParams();
	}, []);

	useEffect(() => {
		// Function to retrieve the UTM parameters from the cookie
		const getUTMParamsFromCookie = () => {
			const cookieValue = document.cookie
				.split('; ')
				.find((row) => row.startsWith('utmParams='))
				?.split('=')[1];

			if (cookieValue) {
				setUTMParams(JSON.parse(cookieValue));
			}
		};

		getUTMParamsFromCookie();
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		// Submit the form with the UTM parameters

		console.log('UTM Parameters:', utmParams);

		// Reset the form or perform any other actions
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type='hidden' name='utm_source' value={utmParams.utmSource || ''} />
			<input type='hidden' name='utm_medium' value={utmParams.utmMedium || ''} />
			<input type='hidden' name='utm_campaign' value={utmParams.utmCampaign || ''} />

			{/* Rest of the form fields */}
			{/* ... */}

			<button type='submit'>Submit</button>
		</form>
	);
};

export default UTMForm;
