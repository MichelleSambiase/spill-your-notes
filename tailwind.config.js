/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{html,js,jsx,tsx}',
		'./components/**/*.{html,js,jsx,tsx,ts}'
	],
	theme: {
		extend: {
			colors: {
				defaultText: '#1F2937',
				purpleText: '#C89CF4',
				greenText: '#B0E9CA',
				yellowText: '#FDE99D',
				grayText: '#E0E0E0',
				purple: '#C89CF480',
				darkPurpleText: '#513E69',
				errorInput: '#CE3A54',
				inputPlaceholder: '#ABABAB',
				newIdeas: '#B0E9CA',
				houseWork: '#FDE99D',
				workTasks: '#35558A',
				personalDiary: '#E0E0E0'
			}
		}
	},
	plugins: []
}
