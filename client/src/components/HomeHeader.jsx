import { Link, useNavigate } from "react-router-dom";
import { IoGlobeOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useEffect, useState } from "react";

const HomeHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [updateKey, setUpdateKey] = useState(0); // Add a state to force re-render
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the token exists in localStorage
        const token = localStorage.getItem('token'); 
        // console.log("Token found:", token);  // Debug log
            setIsLoggedIn(!!token);
    }, [updateKey,setUpdateKey]);

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUpdateKey(prevKey => prevKey + 1);
        // Redirect to the login page
        navigate('/login');
    }


    return (
        <header className="flex items-center justify-around h-[121px]">
            <Link to={'/'} className='text-2xl font-medium'>Resum<span className='text-[#8910F1]'>o</span></Link>

            <nav >
                <ul className="flex gap-x-10 text-base font-medium">
                    <li className="hover:text-[#8910F1]">
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li className="hover:text-[#8910F1]">
                        <Link to={'/templates'}>Template</Link>
                    </li>
                    <li className="hover:text-[#8910F1]">
                        <Link to={'/resume-builder'}>Resume-Builder</Link>
                    </li>
                    <li className="hover:text-[#8910F1]">
                        <Link to={'/about'}>About</Link>
                        {/* <a href="#about">About</a> */}
                    </li>
                </ul>
            </nav>

            {
                isLoggedIn ?
                    (<div className='text-base flex gap-x-5 items-center'>
                        <Link to={'profile-card'} className='border border-black py-2 px-8 rounded-md flex items-center gap-x-1 text-white bg-black active:scale-95 duration-150 hover:shadow-md'><FaRegUserCircle className="bg-transparent" />Profile</Link>
                        <button onClick={handleLogout} className='border py-2 px-8 rounded-md flex items-center gap-x-1 bg-[#8910F1] active:scale-95 duration-150 hover:shadow-md'>Logout<LuLogOut className="bg-[#8910F1]" /></button>
                    </div>) :
                    (<div className="flex gap-x-5">
                        <p className="flex items-center"><IoGlobeOutline />English</p>
                        <Link to={'/login'} className='bg-[#8910F1] py-2 px-5 rounded-md text-white active:scale-95 duration-150 hover:shadow-md'>Start</Link>
                    </div>)
            }
        </header>
    )
}

export default HomeHeader