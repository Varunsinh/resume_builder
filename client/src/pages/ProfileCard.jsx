import { MdDriveFileRenameOutline, MdEmail, MdOutlineDriveFileRenameOutline, MdShareLocation } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoGlobeOutline } from "react-icons/io5";
// import { useEffect, useState } from "react";
// import axios from 'axios';
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  MapPin,
  Paperclip,
  Phone,
} from "react-feather";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const profileData = useSelector(state => state.dataStore.profile);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem('token'); // Get token from localStorage
  //       if (token) {
  //         const response = await axios.get('http://localhost:3000/profile', { // Adjusted URL
  //           headers: { 'Authorization': `Bearer ${token}` } // Use Bearer token for authorization
  //         });

  //         if (response.status === 200) {
  //           // console.log('fetch successfully', response.data);
  //           setData(response.data);
  //         }
  //       } else {
  //         // console.log('No token found');
  //         setError('No token found');
  //       }
  //     } catch (error) {
  //       // console.error('Error fetching data:', error);
  //       setError('Error fetching data');
  //     }
  //     finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();

  // }, []);

  // if (loading) {
  //   return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  // }

  // if (error) {
  //   return <div className="flex items-center justify-center min-h-screen">Error: {error}</div>;
  // }
  // if (!data) {
  //   return <div className="flex items-center justify-center min-h-screen">No data available</div>;
  // }

  return (
    <div className="flex items-start justify-center min-h-screen min-w-80">
      <div className="border p-10 m-5 bg-white shadow">
        <h1 className="text-3xl font-medium tracking-wide bg-white underline">Personal Information</h1>

        <div className="text-xl flex flex-col gap-y-5 mt-10 bg-white">
          <h2 className="flex items-center gap-x-1">Name: <span className="font-medium text-[#8910F1]">{profileData?.name}</span></h2>
          <h2 className="flex items-center gap-x-1">Title: <span className="font-medium text-[#8910F1]">{profileData?.title}</span></h2>
          <h2 className="flex items-center gap-x-1">Linkedin: <span className="font-medium text-[#8910F1]">{profileData?.linkedin}</span></h2>
          <h2 className="flex items-center gap-x-1">Github: <span className="font-medium text-[#8910F1]">{profileData?.github}</span></h2>
          <h2 className="flex items-center gap-x-1">Portfolio: <span className="font-medium text-[#8910F1]">{profileData?.portfolio}</span></h2>
          <h2 className="flex items-center gap-x-1">Email: <span className="font-medium text-[#8910F1]">{profileData?.email}</span></h2>
          <h2 className="flex items-center gap-x-1">Phone: <span className="font-medium text-[#8910F1]">{profileData?.phone}</span></h2>
          <h2 className="flex items-center gap-x-1">City: <span className="font-medium text-[#8910F1]">{profileData?.city}</span></h2>
        </div>
        <div className="mt-10">
        <Link to={'/profile'} className='bg-[#8910F1] py-2 px-4 rounded-md w-fit text-sm text-white'>Edit Profile</Link>
        </div>
      </div>
    </div >
  )
}

export default ProfileCard