import React, { useState } from 'react';
import { VipLogo, BurgerMenu, CloseMenu } from '../assets/index';

import { motion } from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';

import { Link } from 'react-router-dom';
import { changeLanguage } from 'i18next';

// Multilanguage support
import { useTranslation, Trans } from 'react-i18next';

const Navbar = () => {
	const { t, i18n } = useTranslation();

	const [isMenuToggled, setIsMenuToggled] = useState(false);
	// const isAboveSmallScreens = useMediaQuery('(min-width: 768px');
	const isAboveSmallScreens = useMediaQuery('(min-width: 1100px');

	// language state
	const [currentLanguage, setCurrentLanguage] = useState('en'); // default lang
	// dropdown state
	const [showDropdown, setShowDropdown] = useState(false);

	const handleLanguageChange = (language) => {
		changeLanguage(language);
		setCurrentLanguage(language);
		setShowDropdown(false);
	};

	const languages = [
		{ code: 'en', flag: '🇬🇧' },
		{ code: 'es', flag: '🇪🇸' },
		{ code: 'fr', flag: '🇫🇷' },
		{ code: 'de', flag: '🇩🇪' },
		{ code: 'ph', flag: '🇵🇭' },
		// { code: 'en', flag: '🇬🇧', name: 'English' },
		// { code: 'es', flag: '🇪🇸', name: 'Spanish' },
		// { code: 'fr', flag: '🇫🇷', name: 'French' },
		// { code: 'de', flag: '🇩🇪', name: 'German' },
		// { code: 'ph', flag: '🇵🇭', name: 'Philippine' },
	];

	return (
		<nav className={`z-40 w-full top-0 py-2`}>
			<div className='flex items-center justify-between mx-auto w-5/6'>
				{/* VIP SAFETY LOGO  */}
				<Link to='/'>
					<motion.img
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.2, duration: 1.2 }}
						variants={{
							hidden: { opacity: 0, y: 100 },
							visible: { opacity: 1, y: 0 },
						}}
						className='w-[120px] lg:w-[160px]'
						src={VipLogo}
						alt=''
					/>
				</Link>
				{/* Small Screen Language Button  */}
				{/* <div className='flex justify-end w-full lg:w-0 lg:hidden mr-6'> */}
				{/* Language Change  */}
				{/* {currentLanguage === 'en' ? (
						<button onClick={() => handleLanguageChange('es')} className='text-2xl transition duration-300 ease-in-out hover:scale-110'>
							🇪🇸
						</button>
					) : (
						<button onClick={() => handleLanguageChange('en')} className='text-2xl transition duration-300 ease-in-out hover:scale-110'>
							🇬🇧
						</button>
					)}
				</div> */}

				{/* DESKTOP NAV */}
				{isAboveSmallScreens ? (
					<motion.div
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.2, duration: 1.2 }}
						variants={{
							hidden: { opacity: 0, y: -30 },
							visible: { opacity: 1, y: 0 },
						}}
						className='flex justify-between gap-10 font-poppins text-lg font-semibold'
					>
						{/* Language Change with dropdown */}
						<div onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)} className='relative'>
							<button className='text-2xl transition duration-500 ease-in-out hover:scale-110'>{languages.find((lang) => lang.code === currentLanguage).flag}</button>
							{showDropdown && (
								<div className='absolute mt-2 bg-white border rounded shadow'>
									{languages.map((lang) => (
										<button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className='block px-4 py-2 text-left hover:bg-gray-100'>
											{lang.flag} {lang.name}
										</button>
									))}
								</div>
							)}
						</div>

						<Link className='text-navColor hover:text-navColorHover' to='/product'>
							{/* PRODUCT */}
							<Trans i18nKey='navLinks.product'></Trans>
						</Link>
						<Link className='text-navColor hover:text-navColorHover' to='/about'>
							{/* ABOUT */}
							<Trans i18nKey='navLinks.about'></Trans>
						</Link>
						<Link className='text-navColor hover:text-navColorHover' to='/signup'>
							{/* SIGN UP */}
							<Trans i18nKey='navLinks.signup'></Trans>
						</Link>
						<Link className='text-navColor hover:text-navColorHover' to='/help'>
							{/* HELP */}
							<Trans i18nKey='navLinks.help'></Trans>
						</Link>
						<Link className='text-navColor hover:text-navColorHover' to='/blog'>
							{/* BLOG */}
							<Trans i18nKey='navLinks.blog'></Trans>
						</Link>
						<Link className='text-navColor hover:text-navColorHover' to='/portal'>
							{/* CLIENT PORTAL */}
							<Trans i18nKey='navLinks.portal'></Trans>
						</Link>
						{/* Language Change  */}
						{currentLanguage === 'en' ? (
							<button onClick={() => handleLanguageChange('es')} className='text-2xl transition duration-300 ease-in-out hover:scale-110'>
								🇪🇸
							</button>
						) : (
							<button onClick={() => handleLanguageChange('en')} className='text-2xl transition duration-300 ease-in-out hover:scale-110'>
								🇬🇧
							</button>
						)}
					</motion.div>
				) : (
					<motion.button
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.2, duration: 1.2 }}
						variants={{
							hidden: { opacity: 0, y: -30 },
							visible: { opacity: 1, y: 0 },
						}}
						className='p-2'
						onClick={() => setIsMenuToggled(!isMenuToggled)}
					>
						<img className='w-12 rounded-full bg-navColor p-2' src={BurgerMenu} alt='Burger-Menu' />
					</motion.button>
				)}

				{/* MOBILE MENU SCREEN  */}
				{!isAboveSmallScreens && isMenuToggled && (
					<motion.div className='z-40 fixed left-0 bottom-0 h-full bg-white w-[300px] border-r-4 border-purple-300'>
						{/* CLOSE ICON  */}
						<div className='flex justify-end p-8'>
							<button onClick={() => setIsMenuToggled(!isMenuToggled)}>
								<img className='w-8 mb-4' src={CloseMenu} alt='Close-Menu' />
							</button>
						</div>
						{/* MENU ITEMS  */}
						<div className='flex flex-col gap-8 ml-[20%] text-2xl'>
							<Link className='text-navColor hover:text-navColorHover' to='../product'>
								PRODUCT
							</Link>
							<Link className='text-navColor hover:text-navColorHover' to='../about'>
								ABOUT
							</Link>
							<Link className='text-navColor hover:text-navColorHover' to='../signup'>
								SIGN UP
							</Link>
							<Link className='text-navColor hover:text-navColorHover' to='../help'>
								HELP
							</Link>
							<Link className='text-navColor hover:text-navColorHover' to='../blog'>
								BLOG
							</Link>
							<Link className='text-navColor hover:text-navColorHover' to='/portal'>
								CLIENT PORTAL
							</Link>
							{/* <LinkAnchor page='BLOG' selectedPage={selectedPage} setSelectedPage={setSelectedPage} /> */}
						</div>
					</motion.div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
