import React, { useState } from 'react';
import { VipLogo, BurgerMenu, CloseMenu } from '../../assets/index';

import { motion } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';
import AnchorLink from 'react-anchor-link-smooth-scroll-v2';

const Link = ({ page, selectedPage, setSelectedPage }) => {
	const lowerCasePage = page.toLowerCase();
	return (
		<AnchorLink
			className={`${selectedPage === lowerCasePage ? 'text-navColor' : ''}
			text-navColor hover:text-navColorHover transition duration-300`}
			href={`#${lowerCasePage}`}
			onClick={() => setSelectedPage(lowerCasePage)}
		>
			{page}
		</AnchorLink>
	);
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }) => {
	const [isMenuToggled, setIsMenuToggled] = useState(false);
	const isAboveSmallScreens = useMediaQuery('(min-width: 768px');
	const navbarBackground = isTopOfPage ? '' : 'bg-yellow-300';

	return (
		<nav className={`z-40 w-full top-0 py-6`}>
			<div className='flex items-center justify-between mx-auto w-5/6'>
				<img className='w-[120px]' src={VipLogo} alt='' />
				{/* DESKTOP NAV */}
				{isAboveSmallScreens ? (
					<div className='flex justify-between gap-12 font-poppins text-lg font-semibold'>
						<Link page='PRODUCT' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
						<Link page='ABOUT' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
						<Link page='SIGN UP' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
						<Link page='HELP' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
						<Link page='BLOG' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
					</div>
				) : (
					<button className='p-2' onClick={() => setIsMenuToggled(!isMenuToggled)}>
						<img className='w-10 rounded-full bg-navColor p-2' src={BurgerMenu} alt='Burger-Menu' />
					</button>
				)}

				{/* MOBILE MENU SCREEN  */}
				{!isAboveSmallScreens && isMenuToggled && (
					<motion.div className='fixed left-0 bottom-0 h-full bg-white w-[300px] border-r-4 border-purple-300'>
						{/* CLOSE ICON  */}
						<div className='flex justify-end p-8'>
							<button onClick={() => setIsMenuToggled(!isMenuToggled)}>
								<img className='w-8 mb-4' src={CloseMenu} alt='Close-Menu' />
							</button>
						</div>
						{/* MENU ITEMS  */}
						<div className='flex flex-col gap-10 ml-[33%] text-2xl text-navColor'>
							<Link page='PRODUCT' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
							<Link page='ABOUT' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
							<Link page='SIGN UP' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
							<Link page='HELP' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
							<Link page='BLOG' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
						</div>
					</motion.div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
