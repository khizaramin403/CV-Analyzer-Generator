import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import loadingAnimation from '../../../assets/Loadinganimationblue.json'


const Protected = ({children}) => {
    
    const {loading, user} = useAuth();

    if (loading) {
        return (
        <main className="min-h-screen w-full flex flex-col justify-center items-center bg-[#161616] gap-2">
            {/* Lottie Animation Component Wrapper */}
            <div className="w-[150px] h-[150px]">
                <DotLottieReact
                    data={loadingAnimation}
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

    if (!user) {
        return <Navigate to={'/login'} replace/>;
    }

  return children;
}

export default Protected