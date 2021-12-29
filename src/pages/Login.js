import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import { createAvatar } from '@dicebear/avatars'
import * as style from '@dicebear/avatars-bottts-sprites'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Login = () => {
    const [username, setUsername] = React.useState("")
    const navigate = useNavigate()
    const getAvatar = () => {
        return createAvatar(style, {
            seed: username,
            base64: true
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/users", { username })
            const user = response.data
            navigate({
                pathname: '/chat',
                hash: user.id
            }, {
                state: { user }
            })
        } catch (error) {

        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <img
                    width={150}
                    height={150}
                    src={getAvatar()}
                    alt="avatar"
                />
                <TextField
                    size="large"
                    sx={{ width: 400, my: 3 }}
                    variant="standard"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                    variant="contained"
                    size="large"
                    disableElevation
                    type="submit"
                >
                    {"Ingresar"}
                </Button>
            </Box>
        </form>
    )
}

export default Login
