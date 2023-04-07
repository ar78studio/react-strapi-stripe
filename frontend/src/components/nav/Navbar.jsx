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
				{/* MENU LINKS HOVER UNDERLINE */}
				<span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-sunsetOrange transition-all group-hover:w-full'></span>
			</ul>
		</nav>
	);
};

export default Navbar;
