import { gql } from '@apollo/client'

export const GetCustomerQuery = gql`
	query GetCustomers {
		customers {
			nodes {
				id
				firstName
				lastName
				contactNumber
				email
				address {
					addressLine1
					addressLine2
					city
					state
					country
				}
				orders {
					id
					orderDate
					description
					totalAmount
					depositAmount
					isDelivery
					status
					otherNotes
				}
			}
		}
	}
`
