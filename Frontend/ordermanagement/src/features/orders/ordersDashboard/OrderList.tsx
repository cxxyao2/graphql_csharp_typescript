import  { useState, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { IconButton } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import { Customer, Order } from '../../../types/Nonconstants'


interface OrderListProps {
	orders:Array<Order> | undefined
}

export default function OrderList({ orders }: OrderListProps) {
	const [columnDefs] = useState([
		{
			field: 'id',
			width: 50,
			suppressSizeToFit: true,
			cellRenderer: function (params: any) {
				return (
					<IconButton
						onClick={() => window.open(`/orders/${params.value}`, '_blank')}>
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
