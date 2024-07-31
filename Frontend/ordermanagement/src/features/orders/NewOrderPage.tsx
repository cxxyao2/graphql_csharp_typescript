import { Grid } from '@mui/material'
import { Container } from '@mui/system'

import { useParams } from 'react-router-dom'
import OmHeader from '../../components/elements/OmHeader'
import OrderForm from './orderForm/OrderForm'
import { Order } from '../../types/Nonconstants'

export default function NewOrderPage() {
	const params = useParams()
	const customerId = parseInt(params.customerId || '0')
	const order = {
		customerId: customerId
	} as Order

	return (
		<Container >
			<Grid item my={2}>
				<Grid item xs={12}>
					<OmHeader header={'New Order Details'} />
				</Grid>
				<Grid item xs={12}>
					<OrderForm order={order} />
				</Grid>
			</Grid>
		</Container>
	)
}
