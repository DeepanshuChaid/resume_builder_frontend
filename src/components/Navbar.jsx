import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export default  function Navbar () {

  const {user} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const logoutUser = () => {
    navigate('/')
    dispatch(logout())
  }
  
  return(
    <div className="shadow bg-white">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all py-4">
        <Link>
          <img src="/logo.svg" alt="logo" className='h-11 w-auto' />
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden"> Hi, {user?.name}</p>
          <button className="bg-white hover;bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all" onClick={logoutUser}>
            Logout
          </button>  
        </div>
      </nav>
    </div>
  )
}