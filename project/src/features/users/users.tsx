import { Link } from 'react-router-dom'
import { useGetUsersQuery, useRemoveUserMutation } from './users.api'
import { Box, Typography, IconButton, Paper, List, ListItem, ListItemText } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

export const Users = () => {
    const { data, isLoading, error } = useGetUsersQuery(null)
    const [removeUser] = useRemoveUserMutation()

    const handleDelete = (id: string) => {
        removeUser(id)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.error('Failed to delete user:', err)
            })
    }

    return (
        <Box
            sx={{
                padding: 4,
                backgroundColor: '#f4f4f4',
                minHeight: '100vh',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <IconButton
                    component={Link}
                    to="/add"
                    color="primary"
                    aria-label="add user"
                    sx={{ marginRight: 2 }}
                >
                    <AddIcon />
                </IconButton>
                <Typography variant="h4" component="h2">
                    Users
                </Typography>
            </Box>
            {isLoading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">Error fetching users</Typography>}
            <Paper sx={{ padding: 2, backgroundColor: '#fff', marginBottom: 4 }}>
                <List>
                    {data?.map((user) => (
                        <ListItem
                            key={user.id}
                            secondaryAction={
                                <Box>
                                    <IconButton
                                        component={Link}
                                        to={`/edit/${user.id}`}
                                        edge="end"
                                        aria-label="edit"
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(user.id)}
                                        edge="end"
                                        aria-label="delete"
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <ListItemText
                                primary={
                                    <Typography variant="body1">
                                        <strong>
                                            {user.name} with {user.name === 'Sargis' ? '100000' : user.salary}{' '}
                                            {user.name === 'Sargis' ? 'USD' : 'AMD'} salary
                                        </strong>
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    )
}
