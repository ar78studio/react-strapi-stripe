import React from 'react';
import Navbar from './Navbar';

const Header = () => {
	return (
		<header>
			<div className='nav-area flex justify-between'>
				<div>
					<a href='/' className='logo'>
						Logo
					</a>
				</div>

				<Navbar />
			</div>
		</header>
	);
};

export default Header;
