import {  Order } from '../../../types/Nonconstants'
import { useQuery } from '@apollo/client'
import OmLoading from '../../../components/elements/OmLoading'
import OmAlert from '../../../components/elements/OmAlert'
import { GetOrdersWithPageInfoQuery } from '../../../graphql/queries/GetOrdersWithPageInfo'
import OrderList from './OrderList'

interface OrderDashboardChildProps {
	pageSize: number
	skip: number
}

export default function OrderDashboardChild({ pageSize, skip }: OrderDashboardChildProps) {


	const {
		loading,
		error,
		data: ordersData
	} = useQuery(GetOrdersWithPageInfoQuery, {
		variables: {
			take: pageSize,
			skip: skip
		}
	})





	if (loading) {
		return <OmLoading />
	}

	if (error || !ordersData) {
		return <OmAlert message='Could not load orders data' />
	}

	const orders = ordersData?.offsetOrders.items as Order[]

	return (
    <OrderList orders={orders} />
	)
}
