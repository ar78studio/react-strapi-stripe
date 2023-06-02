// export default function useLocalStorage(key, initialValue) {
// 	const [storedValue, setStoredValue] = useState(() => {
// 		try {
// 			const item = window.localStorage.getItem(key);
// 			return item ? JSON.parse(item) : initialValue;
// 		} catch (error) {
// 			console.warn('Error getting local storage item', key, error);
// 			return initialValue;
// 		}
// 	});

// 	const setValue = (value) => {
// 		try {
// 			const valueToStore = value instanceof Function ? value(storedValue) : value;
// 			setStoredValue(valueToStore);
// 			window.localStorage.setItem(key, JSON.stringify(valueToStore));
// 		} catch (error) {
// 			console.warn('Error setting local storage item', key, error);
// 		}
// 	};

// 	return [storedValue, setValue];
// }

import { useState } from 'react';

function useLocalStorage(key, initialValue) {
	// Get from local storage then
	// parse stored json or return initialValue
	const readValue = () => {
		// Prevent build error "window is undefined" but keep keep working
		if (typeof window === 'undefined') {
			return initialValue;
		}

		const item = window.localStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	};

	const [storedValue, setStoredValue] = useState(readValue);

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value) => {
		// Prevent build error "window is undefined" but keep keep working
		if (typeof window === 'undefined') {
			console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`);
		}

		try {
			// Allow value to be a function so we have the same API as useState
			const newValue = value instanceof Function ? value(storedValue) : value;

			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(newValue));

			// Save state
			setStoredValue(newValue);

			// We dispatch a custom event so every useLocalStorage hook are notified
			window.dispatchEvent(new Event('local-storage'));
		} catch (error) {
			console.log(`Error setting localStorage key “${key}”:`, error);
		}
	};

	return [storedValue, setValue];
}

export default useLocalStorage;
