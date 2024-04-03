import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import Container from '@/components/Container'
import { Button, ButtonSignInGoogle, Input, Title } from '@/components/index'
import { defaultErrors, formData } from '@/constant/fieldsValues'
import { signUpImage } from '@/constant/images'
import { animationSelect } from '@/constant/theme'
import { auth } from '@/firebase/auth'
import { updateUserProfile } from '@/redux/userSlice'
import { handleReadNoteValues, setCollection } from '@/services/dbNotes'
import { ButtonLoading, FormRules } from '@/types/types'
import { emailValidation } from '@/utils/validations'

const revealPassword = {
	password: false,
	rePassword: false
}

const buttonLoading: ButtonLoading = {
	defaultLoading: false,
	googleLoading: false
}

const SignUp = () => {
	const [formValues, setFormValues] = useState(formData)
	const [error, setError] = useState<FormRules>(defaultErrors)
	const [loading, setLoading] = useState(buttonLoading)

	const [showPassword, setShowPassword] = useState(revealPassword)
	const dispatch = useDispatch()

	const { password, repeatPassword, fullName, email } = formValues

	const navigate = useNavigate()
	const { t } = useTranslation()

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name

		setFormValues({ ...formValues, [name]: e.target.value })
	}

	const createvalidator = (e: React.FocusEvent<HTMLInputElement, Element>) => {
		switch (e.target.name) {
			case 'fullName':
				setError({
					...error,
					errFullName: !fullName ? t('full_name_field_error') : ''
				})

				break
			case 'email':
				setError({
					...error,
					errEmail: !email ? t('email_field_error') : !emailValidation.test(email) ? 'El email es inválido.' : ''
				})
				break
			case 'password':
				setError({
					...error,
					errPassword: !password ? t('password_field_error') : ''
				})

				break
			case 'repeatPassword':
				setError({
					...error,
					errRepeatPassword: !repeatPassword ? t('repeat_password_field_error') : ''
				})
				break

			default:
				break
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading({ ...loading, defaultLoading: true })

		if (!Object.values(formValues).every(Boolean)) {
			setError({ ...error, errAllFields: 'Todos los campos son requeridos' })
			setLoading({ ...loading, defaultLoading: false })
		} else {
			setError({ ...error, errAllFields: '' })

			if (password === repeatPassword) {
				import('firebase/auth')
					.then((module) => module.createUserWithEmailAndPassword(auth, formValues.email, formValues.password))
					.then((userCredentials) => {
						const user = userCredentials.user

						// Actualizo la info del usuario
						import('../utils/updateProfile')
							.then((module) => {
								module.handleUpdateProfile(auth.currentUser!, formValues.fullName)
							})
							.then(() => {
								// Guardar los datos del usuario
								dispatch(
									updateUserProfile({
										uid: user.uid,
										email: user.email,
										name: user.displayName
									})
								)
								// Redirecciono a Home
								navigate('/home')
							})
					})
					.catch((error) => {
						const errorCode = error.code

						if (errorCode === 'auth/email-already-in-use') {
							setError({
								...error,
								errEmail: 'El email ya fue registrado, intenta con otro por favor.'
							})
						}
						if (errorCode === 'auth/weak-password') {
							setError({
								...error,
								errRepeatPassword: 'Las contraseñas deben tener al menos 6 caracteres'
							})
						}
					})
					.finally(() => setLoading({ ...loading, defaultLoading: false }))
			} else {
				setError({
					...error,
					errRepeatPassword: 'Las contraseñas deben coincidir'
				})
				setLoading({ ...loading, defaultLoading: false })
			}
		}
	}
	const signInWithGoogle = async () => {
		setLoading({ ...loading, googleLoading: true })

		// Google Login
		signInWithPopup(auth, new GoogleAuthProvider())
			.then((res) => {
				const user = res.user

				// Save user info in state
				dispatch(
					updateUserProfile({
						uid: user.uid,
						email: user.email,
						name: user.displayName
					})
				)
				handleReadNoteValues(user.email).then(() => {
					setCollection({
						email: user.email
					})
				})

				// Redirect to Home
				navigate('/home')
			})
			.catch((error) => console.error(error))
			.finally(() => setLoading({ ...loading, googleLoading: false }))
	}

	return (
		<Container className='flex flex-col h-full justify-around md:max-w-md'>
			<Title title={t('title')} clasName='text-2xl text-center' />
			<div className='flex flex-col'>
				{<img src={signUpImage} alt='Imagen ilustrativa' className='w-52 h-52 mx-auto' />}
				<ButtonSignInGoogle
					buttonText={loading.googleLoading ? 'Iniciando sesión...' : `${t('google')}`}
					isLoading={loading.googleLoading}
					type='button'
					handleFunction={signInWithGoogle}
				/>
				<button onClick={() => navigate('/signIn')} className='text-base font-medium leading-5  mt-5  text-darkPurpleText hover:underline'>
					{t('my_account')}
				</button>
			</div>
			<form className='w-full' onSubmit={handleSubmit}>
				<Input
					label={`${t('full_name')}`}
					type='text'
					name='fullName'
					id='fullName'
					value={formValues.fullName}
					error={error.errFullName}
					onChange={handleFormChange}
					onBlur={createvalidator}
					className={`mt-3 ${animationSelect}`}
				/>
				<Input
					label={`${t('Email')}`}
					type='text'
					name='email'
					value={formValues.email}
					error={error.errEmail}
					onChange={handleFormChange}
					onBlur={createvalidator}
					className={`mt-3 ${animationSelect}`}
				/>
				<Input
					label={`${t('password')}`}
					type='password'
					name='password'
					value={formValues.password}
					error={error.errPassword}
					onChange={handleFormChange}
					onBlur={createvalidator}
					setShowPassword={() => setShowPassword((prev) => ({ ...prev, password: !prev.password }))}
					showPassword={showPassword.password}
					className={`mt-3 ${animationSelect}`}
					maxLength={25}
				/>
				<Input
					label={`${t('repeat_password')}`}
					type='password'
					name='repeatPassword'
					value={formValues.repeatPassword}
					error={error.errRepeatPassword}
					onChange={handleFormChange}
					onBlur={createvalidator}
					setShowPassword={() =>
						setShowPassword((prev) => ({
							...prev,
							rePassword: !prev.rePassword
						}))
					}
					showPassword={showPassword.rePassword}
					className={`mt-3 ${animationSelect}`}
					maxLength={25}
				/>

				<p className='text-center text-xs font-medium text-errorInput mt-5'>{error.errAllFields}</p>
				<Button isLoading={loading.defaultLoading || loading.googleLoading} buttonText={`${t('create_account')}`} type='submit' />
			</form>
		</Container>
	)
}

export default SignUp
