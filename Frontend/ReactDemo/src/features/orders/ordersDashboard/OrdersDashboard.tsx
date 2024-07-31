import { Grid, Typography } from '@mui/material'
import OrderList from './OrderList'
import OmLoading from '../../../components/elements/OmLoading'
import OmAlert from '../../../components/elements/OmAlert'
import { GetOrdersQuery } from '../../../graphql/queries/GetOrders'
import { useQuery } from '@apollo/client'
import { Order } from '../../../types/Nonconstants'

export default function OrdersDashboard() {
	const { loading, error, data: ordersData } = useQuery(GetOrdersQuery)
	if (loading) {
		return <OmLoading />
	}

	if (error || !ordersData) {
		return <OmAlert message='Could not load orders data' />
	}

	const orders = ordersData?.orders as Order[]

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
				<OrderList orders={orders} />
			</Grid>
		</Grid>
	)
}
