import React, { useContext } from 'react';
import { AuthContext } from 'react-auth-kit';

function Login() {
	const auth = useContext(AuthContext);

	const handleLogin = async () => {
		// TODO: Call your backend to authenticate the user
		// Replace this with the actual authentication logic
		const fakeUserToken = '12345';
		auth.signIn(fakeUserToken);
	};

	return (
		<div>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
}

export default Login;
