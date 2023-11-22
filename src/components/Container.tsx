import React from 'react'

interface IContainer {
	children: React.ReactNode
	className: string
}
const Container = ({ children, className }: IContainer) => {
	return (
		<div className={`p-4 h-screen w-full mx-auto md:px-0   ${className}`}>
			{children}
		</div>
	)
}

export default Container
