import { useState } from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { Alert, Grid, Snackbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { Form, Formik } from 'formik'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import OmTextField from '../../../components/FormsUI/OmTextField'
import OmSelect, { OptionData } from '../../../components/FormsUI/OmSelect'
import OmSubmitButton from '../../../components/FormsUI/OmSubmitButton'

import OmCheckBox from '../../../components/FormsUI/OmCheckBox'
import OmLoading from '../../../components/elements/OmLoading'
import { Order, OrderModelInput, Status } from '../../../types/Nonconstants'
import { AddOrUpdateOrderMutation } from '../../../graphql/mutations/AddOrUpdateOrder'
import { useMutation } from '@apollo/client'
import { formatDatePicker } from '../../../util/DateFormater'

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import dayjs, { Dayjs } from 'dayjs'

interface OrderFormProps {
	order: Order
}

const FORM_VALIDATION = yup.object().shape({
	orderDate: yup.date(),
	isDelivery: yup.boolean(),
	description: yup.string().required('Description is required'),
	depositAmount: yup.number().required('Deposit amount is required'),
	otherNotes: yup.string(),
	totalAmount: yup.number().required('Deposit amount is required'),
	status: yup
		.string()
		.oneOf(Object.values(Status), 'Invalid status value')
		.required('Status is required')
})

export default function OrderForm({ order }: OrderFormProps) {
	const [open, setOpen] = useState(false)
	const [newDate, setNewDate] = useState<Dayjs | null>(
		dayjs(order.orderDate || new Date())
	)
	const navigate = useNavigate()
	const orderId = order.id
	const customerId = order.customerId || order.customer.id
	const StatusArray: Array<OptionData> = Object.keys(Status).map((key) => ({
		label: key,
		value: key
	}))

	const INITIAL_FORM_STATE = {
		orderDate: formatDatePicker(order.orderDate ?? new Date()),
		description: order.description,
		depositAmount: order.depositAmount,
		otherNotes: order.otherNotes,
		totalAmount: order.totalAmount,
		isDelivery: true,
		status: Status.DRAFT
	}

	const [
		addOrUpdateOrder,
		{ loading: addOrUpdateOrderLoading, error: addOrUpdateOrderError }
	] = useMutation(AddOrUpdateOrderMutation)

	const handleClose = () => {
		setOpen(false)
	}

	async function addOrUpdateOrderDetails(values: any) {
		// map string to enum
		// State[str as keyof typeof State];

		const newValues = values as OrderModelInput
		newValues.id = orderId
		newValues.customerId = customerId
		newValues.status = Status.COMPLETED
		newValues.orderDate = newDate?.toDate() || new Date()

		console.log('new values are ', newValues)

		const response = await addOrUpdateOrder({
			variables: {
				order: newValues
			}
		})

		setOpen(true)

		const order = response.data?.addOrUpdateOrder as Order
		if (order.id) {
			navigate(`/orders/${order.id}`)
		}
	}

	if (addOrUpdateOrderLoading) {
		return <OmLoading />
	}

	if (addOrUpdateOrderError) {
		return (
			<Snackbar open={true} autoHideDuration={6000}>
				<Alert severity='error'>Error retrieving order data</Alert>
			</Snackbar>
		)
	}

	return (
		<Container>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
					{!order.id
						? 'Order details successfully added'
						: 'Order details successfully updated'}
				</Alert>
			</Snackbar>
			<div>
				<Formik
					initialValues={INITIAL_FORM_STATE}
					validationSchema={FORM_VALIDATION}
					onSubmit={addOrUpdateOrderDetails}>
					<Form
						placeholder={undefined}
						onPointerEnterCapture={undefined}
						onPointerLeaveCapture={undefined}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<DemoContainer components={['DatePicker']}>
									<DemoItem label='Order Date'>
										<DatePicker
											value={newDate}
											onChange={(newValue) => setNewDate(newValue)}
										/>
									</DemoItem>
								</DemoContainer>
							</Grid>
							<Grid item xs={12}>
								<OmTextField
									name='description'
									otherProps={{ label: 'Description' }}
								/>
							</Grid>

							<Grid item xs={12}>
								<OmTextField
									name='otherNotes'
									otherProps={{
										label: 'Other Notes',
										multiline: true,
										rows: 4
									}}
								/>
							</Grid>

							<Grid item xs={12}>
								<Typography>Pricing Information</Typography>
							</Grid>
							<Grid item xs={12}>
								<OmTextField
									name='totalAmount'
									otherProps={{ label: 'Total Amount', type: 'number' }}
								/>
							</Grid>
							<Grid item xs={12}>
								<OmTextField
									name='depositAmount'
									otherProps={{ label: 'Deposit Amount', type: 'number' }}
								/>
							</Grid>
							<Grid item xs={12}>
								<Grid item xs={12}>
									<OmCheckBox
										name='isDelivery'
										legend='Include Delivery'
										label='Include Delivery'
										otherProps={{ label: 'Delivery Included' }}
									/>
								</Grid>
							</Grid>

							<Grid item xs={12}>
								<OmSelect
									name='status'
									otherProps={{ label: 'Order Status' }}
									options={StatusArray}></OmSelect>
							</Grid>

							<Grid item xs={12}>
								<OmSubmitButton otherProps={{}}>
									{!order.id ? 'Add New Order' : 'Update Order'}
								</OmSubmitButton>
							</Grid>
						</Grid>
					</Form>
				</Formik>
			</div>
		</Container>
	)
}
