import React from 'react';
import { navLinks } from '../constants/navLinks';

const Navbar = () => {
	return (
		// Start Nav Links
		<nav className=''>
			<ul className={`list-none sm:flex hidden justify-end items-center flex-1`}>
				{navLinks.map((nav, index) => (
					<li
						key={nav.id}
						className={`font-poppins font-medium cursor-pointer mr-6 text-[0.9rem] md:text-[1rem] 
            // Margin right to all but the last nav link. From constants/index.js
            ${index === navLinks.length - 1 ? 'mr-0' : 'mr-6'}
            `}
					>
						<a href={`#${nav.id}`}>
							{nav.title}
							<span className='absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full'></span>
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
