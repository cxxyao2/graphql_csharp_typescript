import { gql } from '@apollo/client'

export const GetOrdersWithPageInfoQuery = gql`
	query GetOffsetOrders($take:Int!, $skip:Int!) {
		offsetOrders(take: $take, skip: $skip) {
			items {
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
		}
	}
`
