import { gql } from '@apollo/client'

export const GetOrdersQuery = gql`
	query GetOrders {
		orders {
			nodes {
				id
				orderDate
				description
				totalAmount
				depositAmount
				isDelivery
				status
				otherNotes
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
