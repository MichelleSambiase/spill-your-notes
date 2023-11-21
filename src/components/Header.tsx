import { useAppSelector } from '../redux/hooks'
import { IHeader } from '../types/types'
import Title from './Title'

const Header = ({ handleLogout, className }: IHeader) => {
	const user = useAppSelector((state) => state.users)

	return (
		<div className='flex items-center justify-end md:justify-between md:px-8'>
			<Title
				title='Spill your notes!'
				clasName={`hidden md:flex text-base ${className}`}
			/>
			<button
				onClick={handleLogout}
				className={`bg-purple bg-opacity-50 rounded-md p-1 text-darkPurpleText `}>
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
