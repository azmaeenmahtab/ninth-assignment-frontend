import React from 'react'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/footer'

const MainLayout = ({ children }) => {
	return (
		<div>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</div>
	)
}

export default MainLayout
