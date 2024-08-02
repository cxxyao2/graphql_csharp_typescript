import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { IconButton } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import { Customer, Order } from '../../../types/Nonconstants'
import { useQuery } from '@apollo/client'
import OmLoading from '../../../components/elements/OmLoading'
import OmAlert from '../../../components/elements/OmAlert'
import { GetOrdersWithPageInfoQuery } from '../../../graphql/queries/GetOrdersWithPageInfo'

interface OrderListProps {
	pageSize: number
	skip: number
}

export default function OrderList({ pageSize, skip }: OrderListProps) {
	const navigate = useNavigate()

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



	const [columnDefs] = useState([
		{
			field: 'id',
			width: 50,
			suppressSizeToFit: true,
			cellRenderer: function (params: any) {
				return (
					<IconButton onClick={() => navigate(`/orders/${params.value}`)}>
						<LaunchIcon fontSize='small' color='secondary' />
					</IconButton>
				)
			}
		},
		{
			field: 'customer',
			cellRenderer: function (params: any) {
				const customer = params.value as Customer
				return customer.firstName + ' ' + customer.lastName
			}
		},
		{ field: 'orderDate' },
		{ field: 'status' }
	])

	const defaultColDef = useMemo(
		() => ({
			sortable: true,
			filter: true,
			resizable: true
		}),
		[]
	)


	if (loading) {
		return <OmLoading />
	}

	if (error || !ordersData) {
		return <OmAlert message='Could not load orders data' />
	}

	const orders = ordersData?.offsetOrders.items as Order[]


	return (
		<div className='ag-theme-alpine' style={{ height: 500, width: '100%' }}>
			<AgGridReact
				rowData={orders}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
			/>
		</div>
	)
}
