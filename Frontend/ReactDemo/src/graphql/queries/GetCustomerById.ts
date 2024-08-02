import { gql } from '@apollo/client'

export const GetCustomerByIdQuery = gql`
	query GetCustomerById($id: Int!) {
		customers(where: { id: { eq: $id } }) {
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
					customer {
						id
						firstName
						lastName
					}
				}
			}
		}
	}
`
