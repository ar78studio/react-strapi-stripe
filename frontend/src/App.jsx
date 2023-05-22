import React from 'react';

import { Navbar, Homepage, Product, About, SignUp, Help, Blog, BlogContent, Footer, Confirmation } from './components/index';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import BlogCategories from './components/blog/BlogCategories';

// Stripe
import { SubscriptionPlan, PaymentForm } from './components/index';

// Apollo client
const client = new ApolloClient({
	uri: 'http://localhost:1337/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<>
			<div className='bg-white w-full m-0'>
				<Router>
					<ScrollToTop />
					<ApolloProvider client={client}>
						<Navbar />
						<Routes>
							<Route exact path='/' element={<Homepage />} />
							<Route path='/Product' element={<Product />} />
							<Route path='/About' element={<About />} />
							<Route path='/SignUp' element={<SignUp />} />
							{/* START STRIPE  */}
							{/* STRIPE SUBSCRIPTION  */}
							<Route exact path='/signup/subscribe' element={<SubscriptionPlan />} />
							<Route exact path='/paymentform' element={<PaymentForm />} />
							<Route exact path='/signup/confirmation' element={<Confirmation />} />
							<Route path='/Help' element={<Help />} />
							<Route path='/Blog' element={<Blog />} />
							<Route path='/BlogContent/:id' element={<BlogContent />} />
							<Route path='/Category/:id' element={<BlogCategories />} />
						</Routes>
						<Footer />
					</ApolloProvider>
				</Router>
			</div>
		</>
	);
}

export default App;
