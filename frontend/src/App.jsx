import React from 'react';

import { Navbar, Homepage, Product, About, SignUp, Help, Blog, BlogContent, Footer, Confirmation, ClientPortal } from './components/index';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import BlogCategories from './components/blog/BlogCategories';

// Stripe
import { SubscriptionPlan } from './components/index';

// ============================================
// FOR BLOGS - Uncomment for Production

// const httpLink = createHttpLink({
// 	uri: 'http://localhost:1337/graphql',
// });

// const authLink = setContext((_, { headers }) => {
// 	// get the authentication token from local storage if it exists
// 	const token =
// 		'29d5fe9455deb2b9ce9f6f207efe1534013cd5d82a1a22f0deb762aa11b84afad9996039864f0f8b24658b6370fe42d6ec1102616e113a0e1444a678a85346978e6ae9b92ea2dc032140d9ae0db90646be6a62e91dff00063c5b1f404fd4b27a0a56d8494bed9f2a3d8bf6289fb8da8bb6707865811f9373a8a453db2c4d60dc';
// 	// return the headers to the context so httpLink can read them
// 	return {
// 		headers: {
// 			...headers,
// 			authorization: token ? `Bearer ${token}` : '',
// 		},
// 	};
// });

// // Apollo client - UNCOMMENT FOR PRODUCTION
// const client = new ApolloClient({
// 	link: authLink.concat(httpLink),
// 	cache: new InMemoryCache(),
// });

// FOR BLOGS - Uncomment for Production
// ============================================

// FOR BLOGS - APOLLO CLIENT - FOR LOCAL DEVELOPMENT

const client = new ApolloClient({
	uri: 'http://localhost:1337/graphql',
	cache: new InMemoryCache(),
});

// useUrlParams custom hook gathers UTM and FPR params
import { useUrlParams } from './hooks/useUrlParams';

const CaptureUrlParams = () => {
	useUrlParams();
	return null; // This component doesn't render anything
};

function App() {
	return (
		<>
			<div className='bg-white w-full m-0 p-0'>
				<Router>
					<ScrollToTop />
					<ApolloProvider client={client}>
						<CaptureUrlParams />
						<Navbar />
						<Routes>
							<Route exact path='/' element={<Homepage />} />
							<Route path='/Product' element={<Product />} />
							<Route path='/About' element={<About />} />
							<Route path='/SignUp' element={<SignUp />} />
							<Route path='/Portal' element={<ClientPortal />} />
							{/* START STRIPE  */}
							{/* STRIPE SUBSCRIPTION  */}
							<Route exact path='/signup/subscribe/payment' element={<SubscriptionPlan />} />
							<Route exact path='/signup/subscribe/confirmation' element={<Confirmation />} />
							{/* END STRIPE  */}
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
