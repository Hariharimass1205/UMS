import React, { useEffect, useState } from 'react'
import Loading from '../components/LoadingPage';
import { useNavigate } from 'react-router-dom';
import { verifyAdminJWT } from '../utils/apiCall';
import { ADD_USER } from '../utils/Constants';
import { toast } from 'sonner';
import { apiClient } from '../lib/api-client';
function Adduser() {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async function () {
            try {
                const isLoggedIn = await verifyAdminJWT()
                if (!isLoggedIn) {
                    navigate('/admin')
                }
            } catch (error) {
                navigate('/admin')
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])


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

    const handleAddUser = async() => {
        try {
            if (validateSignUp()) {
                let response = await apiClient.post(ADD_USER, { name, email, phone, password }, { withCredentials: true })
                console.log(response);
                navigate('/adminhome')
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred during sign-up. Please try again.');
            }
        }
    }

    if (isLoading) return <Loading />
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-lg mx-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Add User</h2>

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
                    onClick={handleAddUser}
                    className="bg-gradient-to-r from-gray-800 to-gray-500 hover:from-gray-900 hover:to-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                    type="submit"
                >
                    Add User
                </button>

            </div>
        </div>
    )
}

export default Adduser
