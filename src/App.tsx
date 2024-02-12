import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { auth } from './firebase/auth'
import NotFound from './NotFound'
import ProtectedRoute from './ProtectedRoute'
import { useAppDispatch } from './redux/hooks'
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
