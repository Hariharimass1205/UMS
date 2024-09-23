import React, { useEffect, useState } from 'react'
import { verifyAdminJWT } from '../utils/apiCall'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/LoadingPage'
import { useParams } from 'react-router-dom';
import { apiClient } from '../lib/api-client';
import { EDIT_USER, USER_DETAIL } from '../utils/Constants';
import { toast } from 'sonner';
function Edituser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [userDetails, setUserDetail] = useState()
    const { userId } = useParams();
    const navigate = useNavigate()
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

    useEffect(() => {
        (async function () {
            const response = await apiClient.post(`${USER_DETAIL}/${userId}`, { withCredentials: true })
            setUserDetail(response.data)
            setName(response.data.username)
            setEmail(response.data.email)
            setPhone(response.data.phone)
        })();
    }, [userId]);
    const validateSignUp = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
        const phoneRegex = /^\d{10}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

        if (!name.length && !email.length && !phone.length) {
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

        return true;
    };

    const handleSubmit = async () => {
        try {
            if (validateSignUp()) {
                await apiClient.post(EDIT_USER, { userId, name, email, phone }, { withCredentials: true })
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

    if (isLoading || !userDetails) return <Loading />
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full max-w-lg mx-4">
                <h2 className="text-2xl font-bold mb-6 text-center">Edit user</h2>

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
                        placeholder="eg: name@email.com"
                        value={email}
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


                <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-gray-800 to-gray-500 hover:from-gray-900 hover:to-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
                    type="submit"
                >
                    Edit user
                </button>

            </div>
        </div>
    )
}

export default Edituser
