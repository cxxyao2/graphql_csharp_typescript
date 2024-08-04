import { Grid, Typography } from '@mui/material'

import TablePagination from '@mui/material/TablePagination'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetOrdersQuery } from '../../../graphql/queries/GetOrders'
import OrderDashboardChild from './OrderDashboardChild'

export default function OrdersDashboard() {
	const [page, setPage] = useState(2)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [totalCount, setTotalCount] = useState(100)

	const { data: allOrdersData } = useQuery(GetOrdersQuery)

	useEffect(() => {
		setTotalCount(allOrdersData?.orders.totalCount)
	}, [allOrdersData])

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography
					component='div'
					variant='h5'
					display='block'
					gutterBottom
					align='center'>
					Orders List
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<TablePagination
					component='div'
					count={totalCount}
					page={page}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
				<OrderDashboardChild pageSize={rowsPerPage} skip={rowsPerPage * page} />
			</Grid>
		</Grid>
	)
}
