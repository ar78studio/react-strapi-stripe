import React from 'react';
import { useEffect, useState } from 'react';

const useFetch = (url) => {
	// first hook is for the data we get back from the fetch request. First data is set to null and then we will use setData function to udpate whatever data we will get from Strapi.
	const [data, setData] = useState([]);
	// first we have zero errors, thus error's initial state is set to null, and then we'll use setError function to update whatever errors we'd get back
	const [error, setError] = useState([]);
	// Whenever we start using the useFetch hook it will initialize the loading state to be true, and then once we've finished fetching the data we will make this false.
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			try {
				const response = await fetch(url);
				const json = await response.json();

				setData(json);
				setLoading(false);
			} catch (error) {
				setError(error);
				// Setting the fetch of data to false once it is done
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { loading, error, data };
};

export default useFetch;
