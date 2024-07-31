// const ORDER_ADD_SUBSCRIPTION = gql`
//   subscription OnCommentAdded($postID: ID!) {
//     commentAdded(postID: $postID) {
//       id
//       content
//     }
//   }
// `;

import { gql } from '@apollo/client'

export const ORDER_CREATED_SUBSCRIPTION = gql`
	subscription onOrderCreated {
		orderCreated {
			id
			customerId
		}
	}
`
