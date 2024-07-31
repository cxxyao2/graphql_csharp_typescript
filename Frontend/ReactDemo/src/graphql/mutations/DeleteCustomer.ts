import { gql } from '@apollo/client'

export const DeleteCustomerMutation = gql`
	mutation deleteCustomer($id: Int!) {
		deleteCustomer(customerId: $id)
	}
`
