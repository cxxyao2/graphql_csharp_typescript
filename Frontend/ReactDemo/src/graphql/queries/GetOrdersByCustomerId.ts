import { gql } from '@apollo/client'

export const GetOrdersByCustomerIdQuery = gql`
	query GetOrders($customerId: Int!) {
		orders(where: { customerId: { eq: $customerId } }) {
			nodes {
				id
				orderDate
				description
				totalAmount
				depositAmount
				isDelivery
				status
				otherNotes
				customerId
				customer {
					id
					firstName
					lastName
					contactNumber
					email
				}
			}
			totalCount
		}
	}
`
