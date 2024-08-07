import { Outlet } from 'react-router-dom'
import NavBar from './nav/NavBar'
import Container from '@mui/material/Container'
import { Box } from '@mui/material'

export default function Layout() {
	return (
		<>
			<NavBar />
			<Container sx={{ p: '2rem', minWidth: 'sm' }}>
				<Box sx={{ bgcolor: 'white', width: '100%' }}>
					<Outlet />
				</Box>
			</Container>
		</>
	)
}
