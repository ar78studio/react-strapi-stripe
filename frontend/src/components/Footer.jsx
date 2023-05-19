import React from 'react';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { WhiteConxhubLogo, DownloadFromApple, GetItFromGooglePlay } from '../assets';
import { FaFacebookSquare, FaLinkedin, FaInstagramSquare, FaTwitterSquare, FaTiktok } from 'react-icons/fa';

const Footer = () => {
	return (
		<>
			{/* DARK BAR UNDER MENU  */}
			<div>
				<div className='w-full bg-buttonColor p-1'></div>
			</div>
			<main className='flex flex-wrap lg:flex-nowrap bg-gradient-to-b from-[#9352e8] to-[#c4a6e4] justify-center items-center md:justify-between lg:px-10 pt-8 pb-20 px-10'>
				{/* CONXHUB WHITE LOGO AND TEXT BELLOW IT  */}
				<section>
					<div className='flex container mx-auto'>
						<Link to='/'>
							<img className='mb-10' src={WhiteConxhubLogo} alt='conXhub Logo' />
						</Link>
					</div>
					{/* TEXT BELLOW CONXHUB LOGO  */}
					<div className='pb-10'>
						<p className='text-white font-base'>Powered by conXhub – conXhub is a multi-faceted communication service supporting millions of customers around the world.</p>
					</div>
				</section>

				{/* FOOTER NAVIGATION MENU  */}
				<section className='flex gap-8 container mw-auto flex-col justify-center items-center text-xl font-semibold'>
					{/* MENU ITEMS  */}

					<Link className='text-white hover:text-buttonColor' to='../Product'>
						PRODUCT
					</Link>
					<Link className='text-white hover:text-buttonColor' to='../About'>
						ABOUT
					</Link>
					<Link className='text-white hover:text-buttonColor' to='../SignUp'>
						SIGN UP
					</Link>
					<Link className='text-white hover:text-buttonColor' to='../Help'>
						HELP
					</Link>
					<Link className='text-white hover:text-buttonColor' to='../Blog'>
						BLOG
					</Link>
				</section>
				{/* TEXT AND BUTTONS ON THE RIGHT OF FOOTER  */}
				<section className='flex flex-col justify-center items-center'>
					<div>
						<p className='text-center text-white py-10'>
							Ordering is simple, everything is online & within minutes of your request you could be using your new Virtual Number to stay safer!
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
							<Link to='../SignUp'> GET YOUR NEW NUMBER NOW</Link>
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
							<img className='w-[11rem]' src={DownloadFromApple}></img>
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
							<img className='w-[12rem]' src={GetItFromGooglePlay}></img>
						</motion.button>
					</div>
				</section>
			</main>
			<div className='flex flex-wrap items-center justify-center md:justify-between bg-[#734d9e] py-6 px-10'>
				<p className='text-white font-medium mb-4'>© 2023 ConXhub. All rights reserved</p>
				<div className='flex gap-2'>
					<a href='https://www.facebook.com/vipsafetyfirstapp' target='_blank'>
						<FaFacebookSquare color='white' size={30} />
					</a>
					<a href='https://www.linkedin.com/company/vip-safety-first/' target='_blank'>
						<FaLinkedin color='white' size={30} />
					</a>
					<a href='https://www.instagram.com/vipsafetyfirst/' target='_blank'>
						<FaInstagramSquare color='white' size={30} />
					</a>
					<a href='https://twitter.com/VIPSafetyFirst' target='_blank'>
						<FaTwitterSquare color='white' size={30} />
					</a>
					<a href='https://www.tiktok.com/@vipsafetyfirst' target='_blank'>
						<FaTiktok color='white' size={30} />
					</a>
				</div>
			</div>
		</>
	);
};

export default Footer;
