import React from 'react';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { WhiteConxhubLogo, DownloadFromApple, GetItFromGooglePlay } from '../assets';

import { FacebookSvg, LinkedinSvg, InstagramSvg, TwitterSvg, TiktokSvg } from '../assets/index';

// Multilanguage support
import { useTranslation, Trans } from 'react-i18next';

const Footer = () => {
	const { t, i18n } = useTranslation();

	return (
		<>
			{/* DARK BAR UNDER MENU  */}
			<div>
				<div className='w-full bg-buttonColor p-1'></div>
			</div>
			<main className='flex flex-wrap lg:flex-nowrap bg-gradient-to-b from-[#9352e8] to-[#c4a6e4] justify-center items-center  lg:px-10 pt-8 pb-20 px-10'>
				{/* CONXHUB WHITE LOGO AND TEXT BELLOW IT  */}
				<section>
					<div className='flex container mx-auto'>
						<Link to='/'>
							<img className='mb-10' src={WhiteConxhubLogo} alt='conXhub Logo' />
						</Link>
					</div>
					{/* TEXT BELLOW CONXHUB LOGO  */}
					<div className='pb-10'>
						<p className='text-white font-base'>
							{/* Powered by conXhub – conXhub is a multi-faceted communication service supporting millions of customers around the world. */}
							<Trans i18nKey='footerTitle'></Trans>
						</p>
					</div>
				</section>

				{/* FOOTER NAVIGATION MENU  */}
				<section className='flex gap-8 container flex-col justify-center items-center text-xl font-semibold'>
					{/* MENU ITEMS  */}

					<Link className='text-white hover:text-buttonColor' to='../product'>
						{/* PRODUCT */}
						<Trans i18nKey='navLinks.product'></Trans>
					</Link>
					<Link className='text-white hover:text-buttonColor' to='../about'>
						{/* ABOUT */}
						<Trans i18nKey='navLinks.about'></Trans>
					</Link>
					<Link className='text-white hover:text-buttonColor' to='../signup'>
						{/* SIGN UP */}
						<Trans i18nKey='navLinks.signup'></Trans>
					</Link>
					<Link className='text-white hover:text-buttonColor' to='../help'>
						{/* HELP */}
						<Trans i18nKey='navLinks.help'></Trans>
					</Link>
					<Link className='text-white hover:text-buttonColor' to='../blog'>
						{/* BLOG */}
						<Trans i18nKey='navLinks.blog'></Trans>
					</Link>
					<Link className='text-white hover:text-buttonColor' to='../portal'>
						{/* CLIENT PORTAL */}
						<Trans i18nKey='navLinks.portal'></Trans>
					</Link>
				</section>
				{/* TEXT AND BUTTONS ON THE RIGHT OF FOOTER  */}
				<section className='flex flex-col justify-center items-center'>
					<div>
						<p className='text-center text-white py-10'>
							{/* Ordering is simple, everything is online & within minutes of your request you could be using your new Virtual Number to stay safer! */}
							<Trans i18nKey='footerOrdering'></Trans>
						</p>
					</div>
					<div>
						<motion.button
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, amount: 0.5 }}
							transition={{ delay: 0.8, duration: 2 }}
							variants={{
								hidden: { opacity: 0 },
								visible: { opacity: 1 },
							}}
							className='place-self-center lg:place-self-start mt-8 mb-10 p-4 w-80 sm:w-96 sm:text-base bg-buttonColor lg:text-[1.3rem] text-base font-semibold rounded-[3rem] text-white transition duration-300 ease-in-out hover:scale-110'
						>
							<Link to='../SignUp'>
								{/* GET YOUR NEW NUMBER NOW */}
								<Trans i18nKey='footerButtons.number'></Trans>
							</Link>
						</motion.button>
					</div>

					<div>
						<motion.button
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, amount: 0.5 }}
							transition={{ delay: 0.8, duration: 2 }}
							variants={{
								hidden: { opacity: 0 },
								visible: { opacity: 1 },
							}}
							className='flex justify-center items-center mt-8 mb-10 p-4 w-60 bg-buttonColor text-base rounded-[3rem] transition duration-300 ease-in-out hover:scale-110'
						>
							<Link to='../SignUp'>
								<img className='w-[11rem]' src={DownloadFromApple}></img>
							</Link>
						</motion.button>
					</div>
					<div>
						<motion.button
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, amount: 0.5 }}
							transition={{ delay: 0.8, duration: 2 }}
							variants={{
								hidden: { opacity: 0 },
								visible: { opacity: 1 },
							}}
							className='flex justify-center items-center mt-8 mb-10 p-4 w-60 bg-buttonColor text-base rounded-[3rem] transition duration-300 ease-in-out hover:scale-110'
						>
							<Link to='../SignUp'>
								<img className='w-[12rem]' src={GetItFromGooglePlay}></img>
							</Link>
						</motion.button>
					</div>
				</section>
			</main>
			<div className='flex flex-col lg:flex-row items-center justify-center lg:justify-between bg-[#734d9e] py-6 px-10'>
				<div className='text-white text-base font-medium p-2'>
					<Link to='http://localhost:1337/admin/auth/login' target='_blank'>
						{/* Blog Admin Login */}
						<Trans i18nKey='footerFooter.blogLogin'></Trans>
					</Link>
				</div>
				<div className='flex flex-col lg:flex-row'>
					<span className='text-white text-center font-medium lg:mb-0'>
						{/* © 2023 VipSafetyFirst. */}
						<Trans i18nKey='footerFooter.year'></Trans>
					</span>
					<span className='text-white text-center font-medium lg:pl-4 lg:mb-0'>
						{/* All rights reserved */}
						<Trans i18nKey='footerFooter.rights'></Trans>
					</span>
				</div>
				<div className='flex p-2'>
					<a href='https://www.facebook.com/vipsafetyfirstapp' target='_blank'>
						{/* <FaFacebookSquare color='white' size={30} /> */}
						<img className='hover:font-[#f20f76]' src={FacebookSvg} alt='Facebook Icon' />
					</a>
					<a href='https://www.linkedin.com/company/vip-safety-first/' target='_blank'>
						{/* <FaLinkedin color='white' size={30} /> */}
						<img className='hover:text-[#f20f76]' src={LinkedinSvg} alt='LinkedIn Icon' />
					</a>
					<a href='https://www.instagram.com/vipsafetyfirst/' target='_blank'>
						{/* <FaInstagramSquare color='white' size={30} /> */}
						<img className='hover:text-[#f20f76]' src={InstagramSvg} alt='Instagram Icon' />
					</a>
					<a href='https://twitter.com/VIPSafetyFirst' target='_blank'>
						{/* <FaTwitterSquare color='white' size={30} /> */}
						<img className='hover:text-[#f20f76]' src={TwitterSvg} alt='Twitter Icon' />
					</a>
					<a href='https://www.tiktok.com/@vipsafetyfirst' target='_blank'>
						{/* <FaTiktok color='white' size={30} /> */}
						<img className='hover:text-[#f20f76]' src={TiktokSvg} alt='TikTok Icon' />
					</a>
				</div>
			</div>
		</>
	);
};

export default Footer;
