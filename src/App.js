import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Chat from './pages/Chat'
import { BrowserRouter } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
