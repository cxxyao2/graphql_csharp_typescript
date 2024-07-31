import { gql } from '@apollo/client'

export const AddOrUpdateCustomerMutation = gql`
	mutation AddOrUpdateCustomer($customer: CustomerModelInput!) {
		addOrUpdateCustomer(customer: $customer) {
			id
			firstName
			lastName
			email
			contactNumber
			address {
				addressLine1
				addressLine2
			}
		}
	}
`
