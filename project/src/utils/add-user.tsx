import React, { useState } from 'react'
import { IUser } from '../features/users/types'
import { useAddUserMutation } from '../features/users/users.api'
import { TextField, Box, Typography, Paper, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const AddUser = () => {
	const [user, setUser] = useState<IUser>({
		id: String(Date.now()),
		name: '',
		salary: 0,
	})

	const [addUser] = useAddUserMutation()
	const navigate = useNavigate()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		addUser(user)
			.unwrap()
			.then(() => {
				setUser({ id: String(Date.now()), name: '', salary: 0 })
			})
			.catch((error) => {
				console.error('Failed to add user:', error)
			})
		navigate('/')

	}

	return (
		<Box
			sx={{
				padding: 4,
				backgroundColor: '#f4f4f4',
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 500 }}>
				<Typography variant="h4" component="h2" gutterBottom>
					Add User
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						name="name"
						label="Name"
						placeholder="Enter name"
						fullWidth
						margin="normal"
						variant="outlined"
						value={user.name}
						onChange={(e) => setUser({ ...user, name: e.target.value })}
					/>
					<TextField
						name="salary"
						label="Salary"
						placeholder="Enter salary"
						type="number"
						InputProps={{
							inputProps: {
								step: 10000,
								min: 0,
							},
						}}
						fullWidth
						margin="normal"
						variant="outlined"
						value={user.salary}
						onChange={(e) => setUser({ ...user, salary: +e.target.value })}
					/>
					<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
						<Button variant="contained" color="primary" type="submit">
							Submit
						</Button>
					</Box>
				</form>
			</Paper>
		</Box>
	)
}
