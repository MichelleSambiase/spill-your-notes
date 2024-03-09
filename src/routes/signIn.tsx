import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { GoogleAuthProvider } from 'firebase/auth'

import { Button, ButtonSignInGoogle, Container, Input, Title } from '@/components'
import { defaultErrors, formData } from '@/constant/fieldsValues'
import { signInImage } from '@/constant/images'
import { animationSelect } from '@/constant/theme'
import { auth } from '@/firebase/auth'
import { useAppDispatch } from '@/redux/hooks'
import { updateUserProfile } from '@/redux/userSlice'
import { ButtonLoading, FormRules } from '@/types/types'

const buttonLoading: ButtonLoading = {
	defaultLoading: false,
	googleLoading: false
}

const SignIn = () => {
	const [formValues, setFormValues] = useState(formData)
	const [error, setError] = useState<FormRules>(defaultErrors)
	const [loading, setLoading] = useState(buttonLoading)
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name

		setFormValues({ ...formValues, [name]: e.target.value })
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading({ ...loading, defaultLoading: true })

		if (!formValues.email && !formValues.password) {
			setError({
				...error,
				errAllFields: 'Los campos email y contraseña son requeridos'
			})
			setLoading({ ...loading, defaultLoading: false })
		} else {
			// Firebase sign in
			import('firebase/auth')
				.then((module) => module.signInWithEmailAndPassword(auth, formValues.email, formValues.password))
				.then((userCredential) => {
					const user = userCredential.user

					// Actualizo la info del usuario
					import('../utils/updateProfile')
						.then((module) => {
							module.handleUpdateProfile(auth.currentUser!, formValues.fullName)
						})
						.then(async () => {
							// Guardar los datos del usuario
							dispatch(
								updateUserProfile({
									uid: user.uid,
									email: user.email,
									name: user.displayName
								})
							)

							import('@/services/dbNotes').then((module) =>
								module.handleReadNoteValues(user.email).then((res) => {
									if (res?.exists()) {
										import('@/services/dbNotes').then((module) =>
											module.setCollection({
												email: user.email
											})
										)
									}
								})
							)
							// Redirecciono a Home
							navigate('/home')
						})
				})
				.catch((error) => {
					setLoading({ ...loading, defaultLoading: false })
					const invalidCredentials = 'auth/invalid-login-credentials'
					const invalidEmail = 'auth/invalid-email'
					const errorCode = error.code

					if (errorCode === invalidCredentials) {
						setError({
							...error,
							errAllFields: 'Revisa tu email y/o contraseña por favor. '
						})
					} else if (invalidEmail) {
						setError({
							...error,
							errEmail: 'Revisa tu email por favor. '
						})
					}
				})
				.finally(() => setLoading({ ...loading, defaultLoading: false }))
		}
	}

	const signInWithGoogle = async () => {
		setLoading({ ...loading, googleLoading: true })

		// Google Login
		import('firebase/auth')
			.then((module) => module.signInWithPopup(auth, new GoogleAuthProvider()))
			.then(async (res) => {
				const user = res.user

				// Save user info in state
				dispatch(
					updateUserProfile({
						uid: user.uid,
						email: user.email,
						name: user.displayName
					})
				)

				import('@/services/dbNotes').then((module) =>
					module.handleReadNoteValues(user.email).then((res) => {
						if (res?.exists()) {
							import('@/services/dbNotes').then((module) =>
								module.setCollection({
									email: user.email
								})
							)
						}
					})
				)

				// Redirect to Home
				navigate('/home')
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading({ ...loading, googleLoading: false }))
	}

	return (
		<Container className='flex flex-col items-center justify-around md:max-w-md'>
			<Title title='Spill your notes.' clasName='text-2xl text-center' />
			<img src={signInImage} alt='Imagen ilustrativa' />
			<ButtonSignInGoogle
				buttonText={loading.googleLoading ? 'Iniciando sesión...' : 'Inicia sesion con Google'}
				isLoading={loading.googleLoading}
				type='button'
				handleFunction={signInWithGoogle}
			/>
			<form action='' className='w-full mt-3' onSubmit={handleSubmit}>
				<Input
					label='Email'
					type='text'
					name='email'
					value={formValues.email}
					error={error.errEmail}
					onChange={handleFormChange}
					onBlur={() => {}}
					className={`mt-3 ${animationSelect}`}
				/>
				<Input
					label='contraseña'
					type='password'
					name='password'
					value={formValues.password}
					error={error.errPassword}
					onChange={handleFormChange}
					onBlur={() => {}}
					setShowPassword={() => setShowPassword(!showPassword)}
					showPassword={showPassword}
					className={`mt-3 ${animationSelect}`}
					maxLength={25}
				/>
				{error && <p className='text-center text-xs font-medium text-errorInput mt-5'>{error.errAllFields}</p>}

				<Button isLoading={loading.defaultLoading} buttonText='Iniciar sesión' type='submit' />
			</form>
			<button onClick={() => navigate('/')} className='text-base font-medium leading-5 text-darkPurpleText mt-10'>
				¿No tienes cuenta? ¡Creála!
			</button>
		</Container>
	)
}

export default SignIn
