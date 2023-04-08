import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import VipSafetyFirstLogo from '../assets/logo-vip-safety-first.png';

export const MuiNavbar = () => {
	return (
		<>
			<AppBar position='static'>
				<Toolbar>
					<IconButton size='xs' edge='start' color='inherit' aria-label='logo'>
						<img src={VipSafetyFirstLogo} alt='Logo' />
					</IconButton>
				</Toolbar>
			</AppBar>
		</>
	);
};
