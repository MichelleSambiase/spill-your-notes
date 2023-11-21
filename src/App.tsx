import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { Container, Title } from './components'
import { auth } from './firebase/auth'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { updateUserProfile } from './redux/userSlice'
import Home from './routes/home/home'
import SignIn from './routes/signIn'
import SignUp from './routes/signUp'

const App = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch(
					updateUserProfile({
						uid: authUser.uid,
						email: authUser.email,
						name: authUser.displayName
					})
				)
			} else {
				dispatch(updateUserProfile(null))
			}
		})
	}, [dispatch])

	return (
		<Routes>
			<Route path='/' element={<SignUp />} />
			<Route path='/signIn' element={<SignIn />} />
			<Route
				path='/home'
				element={
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				}
			/>

			{/* ...other routes */}
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default App

// NotFound component for 404 errors
const NotFound = () => {
	return (
		<Container className='flex flex-col items-center w-full  font-medium'>
			<Title title='Spill your things!' clasName='text-base' />
			<div className='text-center h-full flex justify-center flex-col'>
				<h2>404 ¡Página no encontrada!</h2>
				<p>Ups! Parece que la página que estas buscando no existe.</p>
			</div>
		</Container>
	)
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const user = useAppSelector((state) => state.users)
	const navigate = useNavigate()

	useEffect(() => {
		if (user?.user === null) navigate('/')
	}, [navigate, user.user])

	return children
}
