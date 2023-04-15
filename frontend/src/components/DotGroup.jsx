import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll-v2';

const DotGroup = ({ selectedPage, setSelectedPage }) => {
	const selectedStyles = `relative bg-yellow-300 before:absolute before:w-6 before:h-6  before:rounded-full before:border-2 before:border-yellow-300 before:left-[-50%] before:top-[-50%]`;
	return (
		<div className='flex flex-col gap-6 fixed top-[40%] right-7'>
			<AnchorLink
				className={`${selectedPage === 'home' ? selectedStyles : 'bg-yellow-300'}
			w-3 h-3 rounded-full`}
				href='#home'
				onClick={() => setSelectedPage('home')}
			/>
			<AnchorLink
				className={`${selectedPage === 'product' ? selectedStyles : 'bg-yellow-300'}
			w-3 h-3 rounded-full`}
				href='#product'
				onClick={() => setSelectedPage('product')}
			/>
			<AnchorLink
				className={`${selectedPage === 'about' ? selectedStyles : 'bg-yellow-300'}
			w-3 h-3 rounded-full`}
				href='#about'
				onClick={() => setSelectedPage('about')}
			/>
			<AnchorLink
				className={`${selectedPage === 'signup' ? selectedStyles : 'bg-yellow-300'}
			w-3 h-3 rounded-full`}
				href='#signup'
				onClick={() => setSelectedPage('signup')}
			/>
			<AnchorLink
				className={`${selectedPage === 'help' ? selectedStyles : 'bg-yellow-300'}
			w-3 h-3 rounded-full`}
				href='#help'
				onClick={() => setSelectedPage('help')}
			/>
			<AnchorLink
				className={`${selectedPage === 'blog' ? selectedStyles : 'bg-yellow-300'}
			w-3 h-3 rounded-full`}
				href='#blog'
				onClick={() => setSelectedPage('blog')}
			/>
		</div>
	);
};

export default DotGroup;
