import React from 'react';
import { useEffect, useState } from 'react';
import { Navbar, Product, About, SignUp, Help, Blogs, BlogContent, Footer } from './components/index';
import useMediaQuery from './hooks/useMediaQuery';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	// Media query hook from hooks folder
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
						<Route path='/Blogs' element={<Blogs />} />
					</Routes>
					<Footer />
				</Router>
			</div>
		</>
	);
}

export default App;
