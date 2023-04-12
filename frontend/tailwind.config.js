/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		extend: {
			colors: {
				navColor: '#973cce',
				navColorHover: '#d68ffe',
				faqBackground: '#894fcb',
				fontColor: '#fff',
				buttonColor: '#8d26c9',
			},
			fontFamily: {
				poppins: ['Poppins', 'serif'],
				opensans: ['Open Sans', 'sans-serif'],
			},
			backgroundImage: (theme) => ({
				'gradient-hero': 'linear-gradient(140deg, #C5A7E5 10%, #9452E9 100%)',
			}),
			backgroundImage: (theme) => ({
				'gradient-whatIsVip': 'linear-gradient(190deg, #8365B0 0%, #253165 100%)',
			}),
			backgroundImage: (theme) => ({
				'gradient-feelSafe': 'linear-gradient(220deg, #5331AA 17%, #C874F6 80%)',
			}),
			backgroundImage: (theme) => ({
				'gradient-vipPhoneNumber': 'linear-gradient(220deg, #5331AA 17%, #C874F6 80%)',
			}),
			backgroundImage: (theme) => ({
				'gradient-footerMenu': 'linear-gradient(260deg, #C5A7E5 0%, #9452E9 80%)',
			}),
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
				'2xl': '1536px',
			},
		},

		plugins: [],
	},
};
