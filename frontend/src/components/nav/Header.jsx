import React from 'react';
import Navbar from './Navbar';
import './Menu.css';

import { vipLogo } from '../../assets';

const Header = () => {
	return (
		<>
			<header>
				<div className='nav-area flex justify-between'>
					<a href='/'>
						<img className='VipLogo' href={vipLogo} alt='Vip Safety First Logo'></img>
					</a>

					<Navbar />
				</div>
			</header>
		</>
	);
};

export default Header;
