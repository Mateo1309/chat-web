import { Box, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar } from '@mui/material'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-bottts-sprites'

const UsersList = ({ users, onSelect: handleSelect }) => {

    const getAvatar = (username) => {
        return createAvatar(style, {
            seed: username,
            base64: true
        })
    }

    return (
        <Box
            sx={{
                width: 300,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'primary.dark',
                overflowY: 'auto'
            }}
        >
            <List>
                {
                    users.map(user => (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleSelect(user)}>
                                <ListItemAvatar>
                                    <Avatar src={getAvatar(user.username)}>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText sx={{ color: '#FFF' }} primary={user.username} />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    )
}

export default UsersList