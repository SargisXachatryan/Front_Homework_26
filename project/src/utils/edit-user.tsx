import { useNavigate, useParams } from "react-router-dom"
import { useGetUserByIdQuery, useUpdateUserMutation } from "../features/users/users.api"
import { useState, useEffect } from "react"
import { IUser } from "../features/users/types"
import { Box, TextField, Button, Typography, Paper } from "@mui/material"

export const EditUser = () => {
    const { id } = useParams<{ id: string }>()
    const { data, isLoading, error } = useGetUserByIdQuery(id!)
    const [updateUser] = useUpdateUserMutation()
    const navigate = useNavigate()

    const [user, setUser] = useState<IUser>({
        id: '',
        name: '',
        salary: 0,
    })

    useEffect(() => {
        if (data) {
            setUser({
                id: data.id,
                name: data.name,
                salary: data.salary,
            })
        }
    }, [data])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser(prev => ({
            ...prev,
            [name]: name === 'salary' ? +value : value,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (id) {
            updateUser(user).unwrap()
                .then(() => {
                    navigate('/')
                })
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error || !user) {
        return <div>Error fetching user data</div>
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f4f4f4',
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 500 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Edit User {id}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={user.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Salary"
                        name="salary"
                        type="number"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={user.salary}
                        onChange={handleInputChange}
                        InputProps={{
                            inputProps: {
                                step: 10000, 
                                min: 0,      
                            }
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ width: '100%' }}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    )
}
