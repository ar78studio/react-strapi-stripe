import React from 'react';
import { navLinks } from './navLinks';
import MenuItems from './MenuItems';

const Navbar = () => {
	return (
		<nav>
			<ul className='menus'>
				{navLinks.map((menu, index) => {
					return <MenuItems items={menu} key={index} />;
				})}
			</ul>
		</nav>
	);
};

export default Navbar;
