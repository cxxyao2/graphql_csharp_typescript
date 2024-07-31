import { gql } from "@apollo/client";

export const AddOrUpdateOrderMutation = gql`
	mutation addOrUpdateOrder($order: OrderModelInput!) {
		addOrUpdateOrder(order: $order) {
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
`
