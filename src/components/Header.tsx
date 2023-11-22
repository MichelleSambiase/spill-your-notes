import { useAppSelector } from '../redux/hooks'
import { IHeader } from '../types/types'
import Title from './Title'

const Header = ({ handleLogout, className }: IHeader) => {
	const user = useAppSelector((state) => state.users)

	return (
		<div className='flex items-center justify-end md:justify-between md:px-8'>
			<Title
				title='Spill your notes!'
				clasName={`hidden md:flex md:text-xl font-bold ${className}`}
			/>
			<button
				onClick={handleLogout}
				className={`rounded-lg outline-none bg-[#C89CF4] bg-opacity-60 flex items-start justify-center text-sm text-white ring-0 active:ring-[4px] focus:ring-[#535bf22b] focus:ring-opacity-30  transition-all duration-300 p-2 `}>
				{user.isLoading ? (
					<p>Cargando...</p>
				) : (
					<>
						{user.user === null ? <p>Iniciar sesión</p> : <p>Cerrar sesión</p>}
					</>
				)}
			</button>
		</div>
	)
}

export default Header
