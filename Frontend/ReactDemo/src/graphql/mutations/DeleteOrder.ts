import { gql } from '@apollo/client'

export const DeleteOrderMutation = gql`
	mutation deleteOrder($id: Int!) {
		deleteOrder(orderId: $id)
	}
`
