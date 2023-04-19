import React from 'react';
import { useEffect, useState } from 'react';
// import { DotGroup, Footer } from './components';
import { Navbar, Product, About, SignUp, Help, Blog, Footer, DotGroup } from './components/index';
import useMediaQuery from './hooks/useMediaQuery';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	// const [selectedPage, setSelectedPage] = useState('product');
	// // The bellow const will check if the browser used is below 1060 or above 1060px
	// const [isTopOfPage, setIsTopOfPage] = useState(true);
	const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');

	// PAGE BODY START
	return (
		<>
			<div className='bg-white w-full m-0'>
				<Router>
					<Navbar />
					<Routes>
						<Route path='/Product' element={<Product />} />
						<Route path='/About' element={<About />} />
						<Route path='/SignUp' element={<SignUp />} />
						<Route path='/Help' element={<Help />} />
						<Route path='/Blog' element={<Blog />} />
					</Routes>
					<Footer />
				</Router>
			</div>
		</>
	);
}

export default App;
