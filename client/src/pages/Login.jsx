import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/LoadingPage';
import { verifyJWT } from '../utils/apiCall';
import { toast } from 'sonner';
import { apiClient } from '../lib/api-client';
import { LOGIN_ROUTE } from '../utils/Constants';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../utils/userSlice.js';

function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async function () {
            try {
                const isLoggedIn = await verifyJWT();
                if (isLoggedIn) {
                    navigate('/home');
                }
            } catch (error) {
                navigate('/home');
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    if (isLoading) return <Loading />;

    const validateSignUp = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        if (!emailRegex.test(email)) {
            toast.error('Invalid email format. It should be in the form of name@gmail.com');
            return false;
        }
        if (!passwordRegex.test(password)) {
            toast.error('Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        try {
            if (validateSignUp()) {
                let response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
                dispatch(setUserDetails(response.data));
                navigate('/home');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data);
            } else {
                console.log(error.message);
                toast.error('Enter proper user credentials');
            }
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-200">
            <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                <h2 className="text-center mt-4 text-2xl font-bold mb-4 text-gray-800">Login</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-full p-2 md:p-4 w-full border border-gray-300"
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
                        className="rounded-full p-2 md:p-4 w-full border border-gray-300"
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full md:w-auto"
                    type="submit"
                >
                    Login
                </button>

                <div className="text-center mt-4">
                    <span className="text-gray-700 text-sm font-bold">Not a User?</span>
                    <Link to='/signup' className="text-blue-500 hover:text-blue-700 font-bold ml-2">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
