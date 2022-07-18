import { useContext } from 'react'
import { AuthContext } from '../../Context/authContext'
import './Navbar.css'

const Navbar = () => {
  const { user } = useContext(AuthContext)
  console.log(user)

  return (
    <>
      <div className='navbar'>
        <div className='navContainer'>
          <span className='logo'>Booking App</span>

          {user ? (
            <>
              {' '}
              <p>Hello {user.username}</p>
            </>
          ) : (
            <div className='navItems'>
              <button className='navButton'>Register</button>
              <button className='navButton'>Login</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
