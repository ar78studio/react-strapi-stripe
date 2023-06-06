import React from 'react';

const Button = ({ link, label }) => {
	const handleClick = () => {
		window.open(link, '_blank');
	};

	return <button onClick={handleClick}>{label}</button>;
};

export default Button;
