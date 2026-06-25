import React from 'react'
import { useNavigate, Link } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { message } from 'antd';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import loadingAnimation from '../../assets/loading.json';

export const Register = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {loading, handleRegister} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleRegister({username, email, password});
            message.success("User registered successfully!");
            navigate("/login");
        } catch (err) {
            message.error(err.response?.data?.message || "Registration failed");
        }
    }

    if (loading) {
        return (
        <main className="min-h-screen w-full flex flex-col justify-center items-center bg-[#161616] gap-2">
    {/* Lottie Animation Component Wrapper */}
    <div className="w-[150px] h-[150px]">
        <DotLottieReact
            src={loadingAnimation}
            loop
            autoplay
        />
    </div>
    
    <h1 className="text-whitesmoke text-2xl font-bold tracking-wide">
        Please wait, loading...
    </h1>
</main>
        )
    }

    
  return (
    <main>
        <div className="form-container">
            <h1 className='text-center font-bold text-2xl'>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group  ">
                    <label htmlFor="username">Username</label>
                    <input onChange={(e)=>{setUsername(e.target.value)}} className='border' type="text" name="username" id="username" placeholder="Enter username" />
                </div>

                <div className="input-group  ">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} className='border' type="email" name="email" id="email" placeholder="Enter email address" />
                </div>

                <div className="input-group ">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e)=>{setPassword(e.target.value)}} className='border' type="password" name="password" id="password" placeholder="Enter password" />
                </div>

                <button type='submit' className='button primary-button'>Register</button>
            </form>
            <p className='text-center text-sm '>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    </main>
  )
}
