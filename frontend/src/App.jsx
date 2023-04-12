import { useEffect, useState } from 'react';
import { DotGroup, Hero, WhatIsVip, FeelSafe, AVipPhone, Faq, ContactUs, Footer } from './components';
import Navbar from './components/navbar/Navbar';
import useMediaQuery from './hooks/useMediaQuery';

function App() {
	const [selectedPage, setSelectedPage] = useState('home');
	// The bellow const will check if the browser used is below 1060 or above 1060px
	const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
	const [isTopOfPage, setIsTopOfPage] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY === 0) setIsTopOfPage(true);
			if (window.scrollY !== 0) setIsTopOfPage(false);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className='bg-white'>
			<Navbar isTopOfPage={isTopOfPage} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />

			<div className='w-5/6 mx-auto md:h-full'>{isAboveMediumScreens && <DotGroup selectedPage={selectedPage} setSelectedPage={setSelectedPage} />}</div>

			<div className='bg-gradient-hero w-screen m-0'>
				<Hero />
			</div>

			<WhatIsVip />

			<FeelSafe />

			<AVipPhone />

			<Faq />

			<ContactUs />

			<Footer />
		</div>
	);
}

export default App;
