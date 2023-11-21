import { eyeOffOutline, eyeOutline } from '../assets/icons'
import { IInput } from '../types/types'

const Input = ({
	name,
	label,
	type,
	id,
	maxLength,
	onChange,
	onBlur,
	setShowPassword,
	showPassword,
	icon,
	value,
	className,
	error
}: IInput) => {
	return (
		<div className='relative'>
			<input
				placeholder={label}
				name={name}
				id={id}
				value={value}
				type={showPassword ? 'text' : type}
				maxLength={maxLength}
				onChange={onChange}
				onBlur={onBlur}
				className={`border border-solid border-[#ebebeb] rounded-xl w-full h-11   outline-none pl-4  transition-all  ${
					error &&
					'border-errorInput border-[1px] active:-outline-offset-[3px] focus:ring-[3px] focus:ring-[#e9676766]'
				} ${className}`}
			/>
			{error && (
				<div className='z-10 flex w-full items-start px-2 '>
					<label className='text-xs font-medium text-errorInput '>
						{error}
					</label>
				</div>
			)}
			{icon && (
				<div className='relative '>
					<img
						src={icon}
						alt='Ícono de lupa'
						className='absolute -top-8 right-0 pr-5'
					/>
				</div>
			)}
			{type === 'password' && (
				<button
					onClick={(showPassword) => setShowPassword?.(!showPassword)}
					type='button'
					className='absolute top-6 right-0 pr-5 focus:outline-none'>
					<img
						src={showPassword ? eyeOutline : eyeOffOutline}
						alt='Icono de ojo'
					/>
				</button>
			)}
		</div>
	)
}

export default Input
