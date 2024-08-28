import { FaRegUserCircle } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    navigate('/login');
  }

  return (
    <div className='bg-[#8910F1] text-xl font-medium text-black flex justify-between items-center p-5 shadow-light sticky top-0'>
      <p className="bg-transparent">Resum<span className='text-white bg-transparent'>o</span> Resume Builder</p>

      <div className='text-base flex gap-x-5 items-center bg-transparent'>
        <Link to={'profile'} className='border border-black py-2 px-8 rounded-md flex items-center gap-x-1 text-white hover:bg-black bg-transparent'><FaRegUserCircle className="bg-transparent"/>Profile</Link>
        <button onClick={handleLogout} className='border py-2 px-8 rounded-md flex items-center gap-x-1 hover:bg-white'>Logout<LuLogOut className="bg-transparent"/></button>
      </div>


    </div>
  )
}

export default Header