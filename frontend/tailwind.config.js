/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		extend: {
			colors: {
				menuColor: '#0070f3',
				menuColorHover: '#d68ffe',
				faqBackground: '#894fcb',
				fontColor: '#fff',
			},
			backgroundImage: (theme) => ({
				'hero-gradient': 'linear-gradient(140deg, #C5A7E5 10%, #9452E9 100%);',
			}),
			backgroundImage: (theme) => ({
				'what-is-vip-gradient': 'linear-gradient(190deg, #8365B0 0%, #253165 100%);',
			}),
			backgroundImage: (theme) => ({
				'feel-safe-gradient': 'linear-gradient(220deg, #5331AA 17%, #C874F6 80%);',
			}),
			backgroundImage: (theme) => ({
				'vip-phone-number-gradient': 'linear-gradient(220deg, #5331AA 17%, #C874F6 80%);',
			}),
			backgroundImgae: (theme) => ({
				'footer-menu': 'linear-gradient(260deg, #C5A7E5 0%, #9452E9 80%);',
			}),
			fontFamily: {
				poppins: ['Poppins', 'serif'],
				opensans: ['Open Sans', 'sans-serif'],
			},
			content: {
				vipLogo: "url('./src/assets/logo-vip-safety-first.png')",
				girlHeroSection: "url('./src/assets/girl-frontpage-hero.png')",
				girlWhatIsVip: "url('./src/assets/girl-what-is-vip.png')",
				girlFeelSafe: "url('./src/assets/girl-feel-safe.png')",
				phoneVipNumber: "url('./src/assets/phone-vip-number.png')",
				hearts: "url('./src/assets/hearts.png')",
				whiteLogo: "url('./src/assets/white-logo-conxhub.png')",
			},
			screens: {
				xs: '480px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
			},
		},

		plugins: [],
	},
};
