// ExampleComponent.tsx

import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { gql } from '@apollo/client'

import { OrderModelInput, Status } from '../../types/Nonconstants'



const ADD_OR_UPDATE_ORDER = gql`
	mutation AddOrUpdateOrder($order: OrderModelInput!) {
		addOrUpdateOrder(order: $order) {
			id
			customerId
			orderDate
			description
			totalAmount
			depositAmount
			isDelivery
			otherNotes
			status
			customer {
				id
				firstName
			}
		}
	}
`

const CreateOneOrderPage: React.FC = () => {
	const [order] = useState<OrderModelInput>({
		id: 5,
		customerId: 2, // Replace with actual customer ID
		orderDate: new Date(),
		description: 'a new order2',
		totalAmount: 20,
		depositAmount: 20,
		isDelivery: false,
		otherNotes: 'notes is here',
		status: Status.COMPLETED
	})

	const [addOrUpdateOrder] = useMutation(ADD_OR_UPDATE_ORDER)

	const handleAddOrder = async () => {
		try {
			const { data } = await addOrUpdateOrder({
				variables: { order }
			})
			console.log('Created Order:', data)
			// Handle success or update state as needed
		} catch (error) {
			console.error('Error adding order:', error)
			// Handle error state or display error message
		}
	}

	return (
		<div>
			<button onClick={handleAddOrder}>Add Order</button>
			{/* Render form or inputs to update order state */}
		</div>
	)
}

export default CreateOneOrderPage
