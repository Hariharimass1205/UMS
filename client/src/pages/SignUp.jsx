import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { apiClient } from '../lib/api-client';
import { useNavigate } from 'react-router-dom';
import { SIGNUP_ROUTE } from '../utils/Constants';
import Loading from '../components/LoadingPage';
import { verifyJWT } from '../utils/apiCall';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../utils/userSlice';
function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        (async function () {
            try {
                const isLoggedIn = await verifyJWT()
                if (isLoggedIn) {
                    navigate('/home')
                }
            } catch (error) {
                navigate('/home')
                console.log(error.message)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])
    if (isLoading) return <Loading />

    const validateSignUp = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
        const phoneRegex = /^\d{10}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

        if (!name.length && !email.length && !phone.length && !password.length && !confirmPassword.length) {
            toast.error('Please fill in all fields');
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error('Invalid email format. It should be in the form of name@gmail.com');
            return false;
        }
        if (!usernameRegex.test(name)) {
            toast.error('Username should only contain letters without numbers or special characters');
            return false;
        }
        if (!phoneRegex.test(phone)) {
            toast.error('Phone number should be exactly 10 digits');
            return false;
        }
        if (!passwordRegex.test(password)) {
            toast.error('Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character');
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Password and confirm password should be the same');
            return false;
        }
        return true;
    };


    const handleSignup = async () => {
        try {
            if (validateSignUp()) {
                let response = await apiClient.post(SIGNUP_ROUTE, { name, email, phone, password }, { withCredentials: true })
                console.log(response);
                dispatch(setUserDetails(response.data));
                navigate('/home')
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred during sign-up. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-lg mx-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="border rounded-full p-2 md:p-4 w-full"
                        type="text"
                        id="username"
                        value={name}
                        placeholder="Choose a username"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="border rounded-full p-2 md:p-4 w-full"
                        type="email"
                        id="email"
                        value={email}
                        placeholder="eg: name@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        className="border rounded-full p-2 md:p-4 w-full"
                        type="tel"
                        id="phone"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="border rounded-full p-2 md:p-4 w-full"
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className="border rounded-full p-2 md:p-4 w-full"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm your password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleSignup}
                    className="bg-gradient-to-r from-gray-800 to-gray-500 hover:from-gray-900 hover:to-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                    type="submit"
                >
                    Sign Up
                </button>
                <div className="text-center mt-4">
                    <span className="text-gray-700 text-sm">Already have an account?</span>
                    <Link to='/' className="text-blue-500 hover:text-blue-700 font-bold ml-2">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
