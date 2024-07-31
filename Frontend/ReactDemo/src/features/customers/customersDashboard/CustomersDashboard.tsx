import { Grid, Typography } from '@mui/material'
import CustomerList from './CustomerList'
import OmLoading from '../../../components/elements/OmLoading'
import OmAlert from '../../../components/elements/OmAlert'
import { GetCustomerQuery } from '../../../graphql/queries/GetCustomers'
import { useQuery } from '@apollo/client'
import { Customer } from '../../../types/Nonconstants'

export default function CustomersDashboard() {
	const { data: customersData, loading, error } = useQuery(GetCustomerQuery)

	if (loading) {
		return <OmLoading />
	}

	if (error || !customersData) {
		return <OmAlert message='Could not load customers data' />
	}

	const customers = customersData.customers as Customer[]

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography component='div' variant='h5' display='block' gutterBottom align='center'>
					Customers List
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<CustomerList  customers={customers} />
			</Grid>
		</Grid>
	)
}
