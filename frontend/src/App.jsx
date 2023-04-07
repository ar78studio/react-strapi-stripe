import { useState } from 'react';
import './App.css';
import { Hero, WhatIsVip, FeelSafe, AVipPhone, Faq, ContactUs, Footer } from './components';
import Menu from './components/nav/Menu';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<Menu />
			</div>
			<div>
				<Hero />
			</div>
			<div>
				<WhatIsVip />
			</div>
			<div>
				<FeelSafe />
			</div>
			<div>
				<AVipPhone />
			</div>
			<div>
				<Faq />
			</div>
			<div>
				<ContactUs />
			</div>
			<div>
				<Footer />
			</div>
		</>
	);
}

export default App;
