import React from 'react'
import Navbar from '@/components/Navbar/Navbar'

const MainLayout = ({ children }) => {
	return (
		<div>
			<Navbar />
			<main>{children}</main>
			<footer>{/* Footer will be implemented later */}</footer>
		</div>
	)
}

export default MainLayout
