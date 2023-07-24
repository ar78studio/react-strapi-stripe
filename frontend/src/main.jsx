import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// language support
import './i18n';

import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Suspense fallback={<div>Loading...</div>}>
			<RecoilRoot>
				<App />
			</RecoilRoot>
		</Suspense>
	</React.StrictMode>
);
