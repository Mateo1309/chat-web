import { Box } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useLocation } from 'react-router'
import Messages from '../components/Messages'
import UsersList from '../components/UsersList'

const Chat = () => {
    const location = useLocation()
    const [user, setUser] = React.useState(undefined)
    const [selectedUser, setSelectedUser] = React.useState(undefined)
    const [users, setUsers] = React.useState([])
    const [chat, setChat] = React.useState(undefined)

    const handleSelect = async (selectedUser) => {
        try {
            const response = await axios.post("http://localhost:3000/chats", { users: [user.id, selectedUser.id] })
            setChat(response.data)
            setSelectedUser(selectedUser)
        } catch (error) {

        }
    }

    const getChat = React.useCallback(async (id) => {
        const response = await axios.get(`http://localhost:3000/chats/${id}`)
        setChat(response.data)
    }, [])

    React.useEffect(() => {
        const init = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users")
                setUsers(response.data)
            } catch (error) {

            }
        }
        init()
    }, [])

    React.useEffect(() => { setUser(location?.state?.user) }, [location])

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                overflow: 'hidden'
            }}
        >
            <UsersList
                users={user ? users.filter(u => u.id !== user.id) : []}
                onSelect={handleSelect}
            />

            {
                chat && selectedUser &&
                <Messages
                    chat={chat}
                    user={user}
                    selectedUser={selectedUser}
                    updateChat={getChat}
                />
            }
        </Box>
    )
}

export default Chat
