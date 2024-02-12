import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from './redux/hooks'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const user = useAppSelector((state) => state.users)
	const navigate = useNavigate()

	useEffect(() => {
		if (user?.user === null) navigate('/')
	}, [navigate, user.user])

	return children
}

export default ProtectedRoute
