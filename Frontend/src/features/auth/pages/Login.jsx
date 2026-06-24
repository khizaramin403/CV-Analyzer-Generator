import React from 'react'
import "../../auth/auth.form.scss"
import { useNavigate , Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { message } from 'antd'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import loadingAnimation from '../../../assets/Loadinganimationblue.json'






const Login = () => {

    const {loading, handleLogin } = useAuth()
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            await handleLogin({email, password})
            navigate("/")
        } catch (err) {
            if (err.response?.status === 404) {
                message.warning("User not found. Please sign up first.");
                navigate("/register");
            } else if (err.response?.status === 401) {
                message.error("Please enter correct credentials.");
            } else {
                message.error(err.response?.data?.message || "Invalid credentials. Please try again.");
            }
        }
    }
    if (loading) {
        return (
        <main className="min-h-screen w-full flex flex-col justify-center items-center bg-[#161616] gap-4 select-none">
                {/* Lottie Animation Component Wrapper */}
                <div className="w-[180px] h-[180px] flex justify-center items-center">
                    <DotLottieReact
                        src={loadingAnimation}
                        loop
                        autoplay
                        style={{ width: '100%', height: '100%' }} // Force fully responsive rendering
                    />
                </div>
                
                {/* FIX: text-whitesmoke ko text-gray-200 se badal diya */}
                <h1 className="text-gray-200 text-2xl font-bold tracking-wide text-center">
                    Please wait, loading...
                </h1>
            </main>
        )
    }

    
  return (
    <main>
        <div className="form-container">
            <h1 className='text-center font-bold text-2xl'>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group  ">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e)=>{setEmail(e.target.value)}} className='border' type="email" name="email" id="email" placeholder="Enter email address" />
                </div>

                <div className="input-group ">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e)=>{setPassword(e.target.value)}} className='border' type="password" name="password" id="password" placeholder="Enter password" />
                </div>

                <button type='submit' className='button primary-button'>Login</button>
            </form>
            <p className='text-center text-sm '>Don't have an account? <Link  to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login