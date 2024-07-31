export enum Status {
	PENDING = 'PENDING',
	DRAFT = 'DRAFT',
	COMPLETED = 'COMPLETED',
	SHIPPED = 'SHIPPED'
}

export interface Address {
	id: number
	customerId: number
	addressLine1: string
	addressLine2: string
	city: string
	state: string
	country: string
}

export interface Customer {
	id: number
	firstName: string
	lastName: string
	contactNumber: string
	email: string
	isDeleted: boolean
	address: Address
	orders: Order[]
}

export interface Order {
	id: number
	customerId: number
	orderDate: Date
	description: string
	totalAmount: number
	depositAmount: number
	isDelivery: boolean
	status: Status
	otherNotes: string
	isDeleted: boolean
	customer: Customer
}

export type CustomerModelInput = {
	id?: number
	firstName: string
	lastName: string
	contactNumber: string
	email: string
	addressLine1: string
	addressLine2: string
	city: string
	state: string
	country: string
}

export type OrderModelInput = {
	id?: number
	customerId: number
	orderDate: Date
	description: string
	totalAmount: number
	depositAmount: number
	isDelivery: boolean
	otherNotes: string
	status: Status
}
