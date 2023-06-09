import React, { lazy } from 'react';

// import { AboutVipSafety, FeelSafeWhen, AVipNumber } from '../index.js';

const AboutVipSafety = lazy(() => import('../about/AboutVipSafety'));
const FeelSafeWhen = lazy(() => import('../about/FeelSafeWhen'));
const AVipNumber = lazy(() => import('../about/AVipNumber'));

const About = () => {
	return (
		<>
			<div>
				<AboutVipSafety />
				<FeelSafeWhen />
				<AVipNumber />
			</div>
		</>
	);
};

export default About;
