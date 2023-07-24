// state.js
import { atom } from 'recoil';

export const discountCodeState = atom({
	key: 'discountCodeState', // unique ID (with respect to other atoms/selectors)
	default: '', // default value (aka initial value)
});
