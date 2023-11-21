import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createUserWithEmailAndPassword } from 'firebase/auth'

import { signUpImage } from '../assets/images'
import Container from '../components/Container'
import { Button, Input, Title } from '../components/index'
import { defaultErrors, formData } from '../constant/fieldsValues'
import { animationSelect } from '../constant/theme'
import { auth } from '../firebase/auth'
import { updateUserProfile } from '../redux/userSlice'
import { FormRules } from '../types/types'
import { handleUpdateProfile } from '../utils/updateProfile'
import { emailValidation } from '../utils/validations'

const revealPassword = {
	password: false,
	rePassword: false
}

const SignUp = () => {
	const [formValues, setFormValues] = useState(formData)
	const [error, setError] = useState<FormRules>(defaultErrors)
	const [loading, setLoading] = useState<boolean>(false)
	const [showPassword, setShowPassword] = useState(revealPassword)
	const dispatch = useDispatch()

	const { password, repeatPassword, fullName, email } = formValues

	const navigate = useNavigate()

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name

		setFormValues({ ...formValues, [name]: e.target.value })
	}

	const createvalidator = (e: React.FocusEvent<HTMLInputElement, Element>) => {
		switch (e.target.name) {
			case 'fullName':
				setError({
					...error,
					errFullName: !fullName ? 'El nombre es requerido.' : ''
				})

				break
			case 'email':
				setError({
					...error,
					errEmail: !email
						? 'El email es requerido.'
						: !emailValidation.test(email)
						? 'El email es inválido.'
						: ''
				})
				break
			case 'password':
				setError({
					...error,
					errPassword: !password ? 'La contraseña es requerida.' : ''
				})

				break
			case 'repeatPassword':
				setError({
					...error,
					errRepeatPassword: !repeatPassword
						? 'Repite la contraseña, por favor.'
						: ''
				})
				break

			default:
				break
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		if (!Object.values(formValues).every(Boolean)) {
			setError({ ...error, errAllFields: 'Todos los campos son requeridos' })
			setLoading(false)
		} else {
			setError({ ...error, errAllFields: '' })

			if (password === repeatPassword) {
				createUserWithEmailAndPassword(
					auth,
					formValues.email,
					formValues.password
				)
					.then((userCredentials) => {
						const user = userCredentials.user

						// Actualizo la info del usuario
						handleUpdateProfile(auth.currentUser!, formValues.fullName).then(
							() => {
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
							}
						)
					})
					.catch((error) => {
						const errorCode = error.code

						if (errorCode === 'auth/email-already-in-use') {
							setError({
								...error,
								errEmail:
									'El email ya fue registrado, intenta con otro por favor.'
							})
						}
						if (errorCode === 'auth/weak-password') {
							setError({
								...error,
								errRepeatPassword:
									'Las contraseñas deben tener al menos 6 caracteres'
							})
						}
					})
					.finally(() => setLoading(false))
			} else {
				setError({
					...error,
					errRepeatPassword: 'Las contraseñas deben coincidir'
				})
				setLoading(false)
			}
		}
	}

	return (
		<Container className='flex flex-col items-center h-full justify-around'>
			<Title title='Spill your things.' clasName='text-xs text-center' />
			<img src={signUpImage} alt='Imagen ilustrativa ' className='w-52 h-52' />
			<form action='' className='w-full mt-3 ' onSubmit={handleSubmit}>
				<Input
					label='Nombre Completo'
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
					label='Email'
					type='text'
					name='email'
					value={formValues.email}
					error={error.errEmail}
					onChange={handleFormChange}
					onBlur={createvalidator}
					className={`mt-3 ${animationSelect}`}
				/>
				<Input
					label='contraseña'
					type='password'
					name='password'
					value={formValues.password}
					error={error.errPassword}
					onChange={handleFormChange}
					onBlur={createvalidator}
					setShowPassword={() =>
						setShowPassword((prev) => ({ ...prev, password: !prev.password }))
					}
					showPassword={showPassword.password}
					className={`mt-3 ${animationSelect}`}
					maxLength={25}
				/>
				<Input
					label='repetir contraseña'
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

				<p className='text-center text-xs font-medium text-errorInput mt-5'>
					{error.errAllFields}
				</p>
				<Button isLoading={loading} buttonText='Crear cuenta' type='submit' />
			</form>
			<button
				onClick={() => navigate('/signIn')}
				className='text-base font-medium leading-5 text-darkPurpleText '>
				¿Ya tenes una cuenta? ¡Iniciá sesión!
			</button>
		</Container>
	)
}

export default SignUp
