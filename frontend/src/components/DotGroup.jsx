import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll-v2';

import { motion } from 'framer-motion';

const DotGroup = ({ selectedPage, setSelectedPage }) => {
	// The before: acts as a child component to the parent AnchorLink component. We use CSS before: without creating a div
	const selectedStyles = `relative bg-white before:absolute before:w-6 before:h-6  before:rounded-full before:border-2 before:border-white before:left-[-50%] before:top-[-50%]`;

	return (
		<motion.div
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, amount: 0.5 }}
			transition={{ duration: 2 }}
			variants={{
				hidden: { opacity: 0 },
				visible: { opacity: 1 },
			}}
			className='w-5/6 mx-auto md:h-full'
		>
			<div className='flex flex-col gap-6 fixed top-[40%] right-7'>
				<AnchorLink
					className={`${selectedPage === 'product' ? selectedStyles : 'bg-white'}
			w-3 h-3 rounded-full`}
					href='#product'
					onClick={() => setSelectedPage('product')}
				/>
				<AnchorLink
					className={`${selectedPage === 'about' ? selectedStyles : 'bg-white'}
			w-3 h-3 rounded-full`}
					href='#about'
					onClick={() => setSelectedPage('about')}
				/>
				<AnchorLink
					className={`${selectedPage === 'signup' ? selectedStyles : 'bg-white'}
			w-3 h-3 rounded-full`}
					href='#signup'
					onClick={() => setSelectedPage('signup')}
				/>
				<AnchorLink
					className={`${selectedPage === 'help' ? selectedStyles : 'bg-white'}
			w-3 h-3 rounded-full`}
					href='#help'
					onClick={() => setSelectedPage('help')}
				/>
				<AnchorLink
					className={`${selectedPage === 'blog' ? selectedStyles : 'bg-white'}
			w-3 h-3 rounded-full`}
					href='#blog'
					onClick={() => setSelectedPage('blog')}
				/>
			</div>
		</motion.div>
	);
};

export default DotGroup;
