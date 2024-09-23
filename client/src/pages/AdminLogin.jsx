import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ADMIN_LOGIN } from '../utils/Constants'
import { toast } from 'sonner';
import { apiClient } from '../lib/api-client';
import { verifyAdminJWT } from '../utils/apiCall';
import Loading from '../components/LoadingPage';

function AdminLogin() {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        (async function () {
            try {
                const isLoggedIn = await verifyAdminJWT()
                if (isLoggedIn) {
                    navigate('/adminhome')
                }
            } catch (error) {
                navigate('/adminhome')
                console.log(error.message)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

   

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.length && !password.length) {
            toast.error('Please fill in all fields');
            return false;
        }
        if (!password.length) {
            toast.error('Please enter password');
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error('Invalid email format. It should be in the form of name@gmail.com');
            return false;
        }
        return true

    }
    const handleLogin = async () => {
        try {
            if (validateForm()) {
                await apiClient.post(ADMIN_LOGIN, { email, password })
                navigate('/adminhome')
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            } else {
                toast.error('An error occurred during sign-up. Please try again.');
            }
        }
    }
    if (isLoading) return <Loading />
    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-transparent p-4 md:p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 xl:w-1/4 relative">
                <h2 className="text-center mt-4 text-2xl font-bold mb-4">Admin Login</h2>
                <div className="flex justify-center mb-4">

                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-full p-2 md:p-4 w-full"
                        type="email"
                        id="email"
                        placeholder="eg: name@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-full p-2 md:p-4 w-full"
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="bg-gradient-to-r from-gray-800 to-gray-500 hover:from-gray-900 hover:to-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto"
                    type="submit"
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default AdminLogin
