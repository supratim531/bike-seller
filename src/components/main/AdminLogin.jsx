import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { unauthorizedAxios } from '../../axios/axios';

import {
  Ripple,
  Input,
  initTE,
} from "tw-elements";

function AdminLogin() {
  const location = useLocation();
  const navigate = useNavigate();

  const [credential, setCredential] = useState({
    username: "",
    password: ""
  });

  const handleCredentialChange = e => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }

  const login = async payload => {
    try {
      const res = await unauthorizedAxios.post("/auth/login/", payload);
      console.log("res:", res);
      const data = res?.data;
      console.log("data:", data);
      localStorage.setItem("token", data?.token);
      window.location.href = '/';
    } catch (err) {
      console.log("err:", err);
    }
  }

  const adminLogin = e => {
    e.preventDefault();
    console.log(credential);
    login(credential);
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate('/');
    }
  });

  useEffect(() => {
    initTE({ Ripple, Input }, { allowReinits: true });
  });

  return (
    <div className="h-[100vh] flex items-center bg-gradient-to-r from-purple-400 to-indigo-600">
      <div className="mx-6 xs:mx-10 sm:mx-32 md:mx-48 xl:mx-60 2xl:mx-[26rem] 3xl:mx-[34rem] lg:flex w-full rounded bg-white">
        <div className="hidden lg:p-4 lg:block lg:w-[50%] border-r border-slate-400">
          <div className="h-full lg:bg-[url(https://images.unsplash.com/photo-1590506995460-d0d9892b54da?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] lg:bg-cover lg:bg-no-repeat lg:rounded"></div>
        </div>
        <div className="lg:w-[50%] flex flex-col gap-3 rounded-md">
          <div className="pt-6 flex justify-center">
            <div style={{ clipPath: "circle(50% at 50% 50%)" }} className="flex justify-center items-center w-32 h-32 md:w-44 md:h-44 bg-blue-800">
              <div style={{ clipPath: "circle(50% at 50% 50%)" }} className="w-[7.8rem] h-[7.8rem] md:w-[10.8rem] md:h-[10.8rem] bg-[url(https://images.unsplash.com/photo-1590506995460-d0d9892b54da?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] lg:bg-[url(https://images.unsplash.com/photo-1549958909-db7599598400?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-no-repeat"></div>
            </div>
          </div>
          <div className="font-[Poppins]">
            <div className="text-4xl text-center font-semibold text-slate-600">Bike.com</div>
            <div className="text-xl text-center text-slate-400">Welcome back!</div>
            <div className="text-center font-semibold text-blue-600">
              <Link to={'/'}>Go To Home</Link>
            </div>
          </div>
          <form onSubmit={adminLogin} className="px-4 py-6 text-lg">
            <div className="mb-4 flex flex-col gap-4">
              <div className="relative font-roboto" data-te-input-wrapper-init>
                <input
                  name="username"
                  onChange={handleCredentialChange}
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                  placeholder="Username"
                />
                <label htmlFor="email" className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                  Username <b className="text-red-600">*</b>
                </label>
              </div>
              <div className="relative font-roboto" data-te-input-wrapper-init>
                <input
                  name="password"
                  onChange={handleCredentialChange}
                  type="password"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] md:py-[0.01rem] leading-[2.6] lg:leading-[3.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 font-medium text-blue-800"
                  placeholder="Password"
                />
                <label htmlFor="password" className="font-roboto pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none">
                  Password <b className="text-red-600">*</b>
                </label>
              </div>
            </div>
            <button className="font-[Roboto] py-3 w-full rounded-md flex justify-center items-center hover:scale-105 duration-300 font-medium text-white bg-blue-800">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
