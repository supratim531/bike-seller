import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bikeLogo from "../../assets/bike.png";
import adminLogo from "../../assets/admin.png";
import RootContext from '../../context/RootContext';
import { logout } from '../../utils/logout';

function Navbar() {
  const navigate = useNavigate();
  const context = useContext(RootContext);

  return (
    <nav className="z-50 flex w-full sticky top-0 py-0.5 md:py-1 lg:flex-wrap lg:justify-start flex-nowrap items-center justify-between bg-[#81b64c]" data-te-navbar-ref="">
      <div className="sm:px-3 w-full flex flex-wrap items-center justify-between">
        <div className="relative ml-2">
          <div className="absolute -top-5">
            <img className="w-8" src={bikeLogo} alt="" />
          </div>
          <Link to={'/'} className="text-lg sm:text-2xl font-semibold text-white">Bike.com</Link>
          <Link to={'/'} className="ml-3 sm:ml-4 text-[0.7rem] min-[330px]:text-sm sm:text-base text-white">Products</Link>
        </div>
        <div className="">
          {
            context?.isLogin ?
              <div className="mr-2 flex space-x-1 sm:space-x-4">
                <div className="flex justify-center items-center">
                  <button onClick={() => navigate("/add-bike")} className="px-2.5 py-0.5 sm:px-3 sm:py-1 flex items-center space-x-2 rounded-full shadow-sm shadow-green-900 bg-white">
                    <div className="">
                      <i className="fa-solid fa-plus text-lg sm:text-2xl font-bold text-green-950"></i>
                    </div>
                    <div className="font-medium text-green-900">POST</div>
                  </button>
                </div>
                <div className="relative pt-4 flex flex-col items-center">
                  <div onClick={logout} className="cursor-pointer">
                    <i className="fa-solid fa-right-from-bracket text-3xl text-red-600"></i>
                  </div>
                  <span onClick={logout} className="cursor-pointer font-[Roboto] font-semibold text-center text-[0.7rem] text-green-950">Logout</span>
                </div>
              </div> :
              <Link to={"/admin-login"} className="relative mr-2 pt-2 flex flex-col items-center cursor-pointer">
                <div className="rounded-full overflow-hidden bg-white">
                  <img className="w-12" src={adminLogo} alt="Admin Logo" />
                </div>
                <span className="font-[Roboto] font-semibold text-center text-[0.7rem] text-green-950">Admin Login</span>
              </Link>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
