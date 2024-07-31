import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import OmHeader from '../../components/elements/OmHeader'
import CustomerForm from './customerForms/CustomerForm'
import { Customer } from '../../types/Nonconstants'

export default function NewCustomerPage() {
	const customer = {} as Customer

	return (
		<Container>
			<Grid item spacing={12} my={2}>
				<Grid item xs={12} >
					<OmHeader header={'New Customer Details'} />
				</Grid>
				<Grid item xs={12}>
					<CustomerForm customer={customer} />
				</Grid>
			</Grid>
		</Container>
	)
}
