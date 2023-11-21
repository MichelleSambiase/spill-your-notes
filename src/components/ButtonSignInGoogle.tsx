import { googleIcon, LoadingIcon } from '../assets/icons'
import { IButton } from '../types/types'

const ButtonSignInGoogle = ({
	buttonText,
	isLoading,
	handleFunction
}: IButton) => {
	return (
		<button
			type='button'
			onClick={handleFunction}
			className='flex items-center rounded-xl border border-solid border-[#ebebeb] w-full p-3 hover:outline-purple-900 hover:ring-gray-300 hover:ring-4 hover:ring-offset-0 hover:ring-opacity-40 hover:border-purple-900 hover:transition-all focus:bg-[#EEE]  focus:font-bold '>
			{isLoading ? (
				<LoadingIcon stroke='gray' />
			) : (
				<img src={googleIcon} alt='Ícono de Google' />
			)}
			<p className='text-sm text-inputPlaceholder font-medium pl-6'>
				{buttonText}
			</p>
		</button>
	)
}

export default ButtonSignInGoogle
