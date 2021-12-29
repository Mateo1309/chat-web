import React from 'react'
import { Box, IconButton, Paper, TextField, Typography, Avatar } from '@mui/material'
import { Send } from '@mui/icons-material'
import axios from 'axios'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-bottts-sprites'
import firebase from '../firebase/config'
import { ref, set, onValue } from "firebase/database"

function notifyChatUpdate(chatId) {
    set(ref(firebase, 'chats/' + chatId), Math.random());
}


const Messages = ({ chat, user, updateChat, selectedUser }) => {

    const el = React.useRef(null)
    const [text, setText] = React.useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const newMessage = {
                text,
                sent: new Date(),
                userId: user.id
            }
            await axios.put(`http://localhost:3000/chats/${chat.id}`, { ...chat, messages: [...chat.messages, newMessage] })
            setText("")
            notifyChatUpdate(chat.id)
        } catch (error) {

        }
    }

    const getAvatar = (username) => {
        return createAvatar(style, {
            seed: username,
            base64: true
        })
    }

    React.useEffect(() => {
        const chatRef = ref(firebase, 'chats/' + chat.id);
        onValue(chatRef, () => {
            updateChat(chat.id)
        })
    }, [chat.id, updateChat])

    React.useEffect(() => {
        el.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
    })

    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: 'grey.100',
                p: 4,
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        bgcolor: '#fff',
                        overflowY: 'auto'
                    }}
                >
                    {
                        chat.messages.map(message => (
                            <Paper
                                sx={{
                                    p: 3,
                                    width: 'auto',
                                    alignSelf: message.userId === user.id ? 'end' : 'start',
                                    m: 1,
                                    display: 'flex',
                                    flexDirection: message.userId === user.id ? 'row-reverse' : 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <Avatar src={getAvatar(message.userId === user.id ? user.username : selectedUser.username)} />
                                <Box sx={{ px: 2 }}>
                                    <Typography>
                                        {message.text}
                                    </Typography>
                                    <Typography variant="caption" color="primary">
                                        {`${new Date(message.sent).toLocaleTimeString()} - ${new Date(message.sent).toLocaleDateString()}`}
                                    </Typography>
                                </Box>
                            </Paper>
                        ))
                    }
                    <div id={'el'} ref={el} />
                </Box>
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            px: 2, py: 2
                        }}
                    >
                        <TextField
                            fullWidth
                            size="large"
                            placeholder="Mensaje..."
                            variant="standard"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <IconButton sx={{ ml: 2 }}>
                            <Send color="primary" />
                        </IconButton>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default Messages
