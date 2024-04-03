import { lazy, Suspense, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Route, Routes } from 'react-router-dom'

import { LoadingIcon } from '@/assets/icons'
import { Title } from '@/components'
import { auth } from '@/firebase/auth'
import { useAppDispatch } from '@/redux/hooks'
import { updateUserProfile } from '@/redux/userSlice'

import i18n from './i18n/i18n'

const Home = lazy(() => import('@/routes/home/home'))
const SignIn = lazy(() => import('@/routes/signIn'))
const SignUp = lazy(() => import('@/routes/signUp'))
const NotFound = lazy(() => import('@/NotFound'))
const ProtectedRoute = lazy(() => import('@/ProtectedRoute'))

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
		<I18nextProvider i18n={i18n}>
			<Suspense fallback={<LoadingContent />}>
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
			</Suspense>
		</I18nextProvider>
	)
}

export default App

const LoadingContent = () => {
	return (
		<div className='flex flex-col items-center h-full justify-around'>
			<Title title='Spill your notes.' clasName='text-2xl text-center mt-3' />
			<div className='flex flex-row w-full items-center justify-center mt-5'>
				<h3 className='font-medium text-darkPurpleText text-lg'>¡Cargando contenido!</h3>
				<LoadingIcon stroke='gray' className='ml-2 flex items-center animate-spin w-6 h-6' />
			</div>
		</div>
	)
}
