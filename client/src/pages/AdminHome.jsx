import React, { useEffect, useState } from 'react'
import UsersTable from '../components/UsersTable'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/LoadingPage'
import { verifyAdminJWT } from '../utils/apiCall'
import Swal from 'sweetalert2';
import { toast } from 'sonner'
function AdminHome() {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
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
    if (isLoading) return <Loading />
    const handleLogout = () => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will be logged out of the application.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, log out!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
                customClass: {
                    confirmButton: 'swal-button-confirm',
                    cancelButton: 'swal-button-cancel'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    sessionStorage.clear();
                    localStorage.clear();
                    toast.success("Logged out successfully!", {
                        autoClose: 3000,
                    });
                    navigate('/admin');
                }
            });

        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
    return (
        <>
            <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
                <nav className=" bg-gray-600 p-4 shadow-md">
                    <div className="container mx-auto flex items-center justify-between">
                        <h1 className="text-white text-2xl font-bold">Admin Home</h1>
                        <button
                            onClick={handleLogout}
                            className="w-30 bg-gradient-to-r from-red-800 to-red-500 hover:from-red-900 hover:to-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Logout
                        </button>
                    </div>
                </nav>

                <UsersTable />
            </div>

        </>
    )
}

export default AdminHome
