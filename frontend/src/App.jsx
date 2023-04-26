import React from 'react';

import { Navbar, Homepage, Product, About, SignUp, Help, Blog, BlogContent, Footer } from './components/index';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// ApolloClient is used to create new connection to graphql server.
// InMemoryCache is used by the Apollo client to cache responses from the server
// ApolloProvider is used to wrap entire React application and to use ApolloClient to make queries
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

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
					<ApolloProvider client={client}>
						<Navbar />
						<Routes>
							<Route exact path='/' element={<Homepage />} />
							<Route path='/Product' element={<Product />} />
							<Route path='/About' element={<About />} />
							<Route path='/SignUp' element={<SignUp />} />
							<Route path='/Help' element={<Help />} />
							<Route path='/Blog' element={<Blog />} />
							<Route path='/BlogContent/:id' element={<BlogContent />} />
						</Routes>
						<Footer />
					</ApolloProvider>
				</Router>
			</div>
		</>
	);
}

export default App;
