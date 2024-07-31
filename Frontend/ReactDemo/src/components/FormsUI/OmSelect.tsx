import { MenuItem, TextField } from '@mui/material'
import { useField, useFormikContext } from 'formik'

export interface OptionData {
	label: string
	value: string | number
}

interface OmSelectProps {
	name: string
	options: Array<OptionData>
	otherProps: any
}

export default function OmSelect({ name, options, otherProps }: OmSelectProps) {
	const { setFieldValue } = useFormikContext()
	const [field, meta] = useField(name)

	function handleChange(event: any) {
		const { value } = event.target
		setFieldValue(name, value)
	}

	const configSelect = {
		...field,
		...otherProps,
		select: true,
		fullWidth: true,
		variant: 'outlined',
		onChange: handleChange
	}

	if (meta && meta.touched && meta.error) {
		configSelect.error = true
		configSelect.helperText = meta.error
	}
	const optionsData = [...options]

	return (
		<TextField {...configSelect}>
			{optionsData.map((item) => (
				<MenuItem key={item.value} value={item.value}>
					{item.label}
				</MenuItem>
			))}
		</TextField>
	)
}
