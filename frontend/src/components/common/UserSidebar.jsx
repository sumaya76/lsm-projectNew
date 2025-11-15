import React, { useContext } from 'react';
import { FaChartBar, FaDesktop, FaUserLock } from "react-icons/fa";
import { BsMortarboardFill } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/Auth"; // adjust path

const UserSidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/account/login");
  };

  return (
    <div className='card border-0 shadow-lg'>
      <div className='card-body p-4'>
        <ul>
          <li className='d-flex align-items-center'>
            <Link to="/account/dashboard"><FaChartBar size={16} className='me-2' /> Dashboard</Link>
          </li>
          <li className='d-flex align-items-center'>
            <Link to="/account/my-learning"><BsMortarboardFill size={16} className='me-2' /> My Learning</Link>
          </li>
          <li className='d-flex align-items-center'>
            <Link to="/account/my-courses"><FaDesktop size={16} className='me-2'/> My Courses</Link>
          </li>
          <li className='d-flex align-items-center'>
            <Link to="/account/change-password"><FaUserLock size={16} className='me-2'/> Change Password</Link>
          </li>
          <li>
            <button onClick={handleLogout} className='btn btn-link text-danger p-0 d-flex align-items-center'>
              <MdLogout size={16} className='me-2'/> Logout
            </button>
          </li>
        </ul>
      </div>                             
    </div>
  );
}

export default UserSidebar;
