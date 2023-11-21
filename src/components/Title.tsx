import { ITitle } from '../types/types'

const textColors = {
	defaultText: '#1F2937',
	purpleText: '#C89CF4',
	greenText: '#B0E9CA',
	yellowText: '#FDE99D',
	grayText: '#E0E0E0'
}

const Title = ({ title, clasName }: ITitle) => {
	const colorizedTitle = title
		.toUpperCase()
		.split('')
		.map((char: string, index: number) => {
			const color = getColorForIndex(index)

			return (
				<span key={index} style={{ color }}>
					{char}
				</span>
			)
		})

	return (
		<div className={`md:items-start md:mt-0 font-medium  ${clasName}`}>
			<h1 className='text-3xl md:text-xl'>{colorizedTitle}</h1>
		</div>
	)
}

const getColorForIndex = (index: number) => {
	const colors = Object.values(textColors)
	return colors[index % colors.length]
}

export default Title
