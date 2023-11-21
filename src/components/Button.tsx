import { LoadingIcon } from '../assets/icons'
import { IButton } from '../types/types'

const Button = ({ buttonText, handleFunction, isLoading }: IButton) => {
	return (
		<button
			onClick={handleFunction}
			className='bg-purple  rounded-xl w-full p-3 mt-5 flex justify-center'>
			{isLoading ? (
				<LoadingIcon stroke='white' />
			) : (
				<p className='text-darkPurpleText text-base font-medium leading-5'>
					{buttonText}
				</p>
			)}
		</button>
	)
}

export default Button
