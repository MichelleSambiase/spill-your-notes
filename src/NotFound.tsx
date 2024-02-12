import { Container, Title } from './components'

const NotFound = () => {
	return (
		<Container className='flex flex-col items-center w-full  font-medium'>
			<Title title='Spill your notes!' clasName='text-base' />
			<div className='text-center h-full flex justify-center flex-col'>
				<h2>404 ¡Página no encontrada!</h2>
				<p>Ups! Parece que la página que estas buscando no existe.</p>
			</div>
		</Container>
	)
}

export default NotFound
