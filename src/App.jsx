import React, {useEffect} from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import ResumeBuilder from "./pages/ResumeBuilder.jsx"
import Login from "./pages/Login.jsx"
import Layout from "./pages/Layout.jsx"
import Preview from "./pages/Preview.jsx"
import { useDispatch } from 'react-redux'
import api from './configs/api.js'
import { login, setLoading } from './app/features/authSlice.js'
import { Toaster } from 'react-hot-toast'

export default function App() {

  const dispatch = useDispatch()

  const getUserData = async () => {
    const token = localStorage.getItem("token")

    try {
      if (token) {
        const {data} = await api.get("/api/users/data", {headers: {authorization: token}})

        if (data.user) {
          dispatch(login({token, user: data.user}))
        }
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error)
    }
  } 

  useEffect(() => {
      getUserData()
  }, [])

  
  return (
    <>
      <Toaster position="top-center" />
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="app" element={<Layout />}>
        <Route index element={<Dashboard />} />  
        <Route path="builder/:resumeid" element={<ResumeBuilder />} />
      </Route>

      <Route path="view/:resumeid" element={<Preview />} />
      <Route path="login" element={<Login />} />
    </Routes>
    </>
  )
}

